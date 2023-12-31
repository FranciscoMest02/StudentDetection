import cv2
import face_recognition
from pathlib import Path
import pickle
from collections import Counter
import datetime
import requests

DEFAULT_ENCODINGS_PATH = Path("output/encodings.pkl")
logged_today = set()  # Global set to keep track of names logged today

def encode_known_faces(
    model: str = "hog", encodings_location: Path = DEFAULT_ENCODINGS_PATH
) -> None:
    """
    Loads images in the training directory and builds a dictionary of their
    names and encodings.
    """
    names = []
    encodings = []
    for filepath in Path("training").glob("*/*"):
        name = filepath.parent.name
        image = face_recognition.load_image_file(filepath)

        face_locations = face_recognition.face_locations(image, model=model)
        face_encodings = face_recognition.face_encodings(image, face_locations)

        for encoding in face_encodings:
            names.append(name)
            encodings.append(encoding)

    name_encodings = {"names": names, "encodings": encodings}
    with encodings_location.open(mode="wb") as f:
        pickle.dump(name_encodings, f)

def has_been_logged_today(name):
    today = datetime.datetime.now().strftime('%Y-%m-%d')
    return (name, today) in logged_today

def send_put_request():
    url = 'http://localhost:3000/api/students/attendance/651b2ca6d2c5faca9bfa182a'  # Replace with the URL you're sending the request to
    payload = {
        "minutes": 160,
        "date": "2023-10-04T14:30:00"
    }
    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.put(url, json=payload, headers=headers)
    if response.status_code == 200:
        print('PUT request successful:', response.text)
    else:
        print('Failed to send PUT request:', response.text)

def log_recognition(name):
    today = datetime.datetime.now().strftime('%Y-%m-%d')
    if not has_been_logged_today(name):
        with open('attendance.txt', 'a') as attendance_file:
            attendance_file.write(f'{today}, {name}\n')
        logged_today.add((name, today))  # Add the name and date to the set

def _recognize_face(unknown_encoding, loaded_encodings):
    boolean_matches = face_recognition.compare_faces(
        loaded_encodings["encodings"], unknown_encoding
    )
    votes = Counter(
        name
        for match, name in zip(boolean_matches, loaded_encodings["names"])
        if match
    )
    if votes:
        return votes.most_common(1)[0][0]

def recognize_faces_live(
    model: str = "hog",
    encodings_location: Path = DEFAULT_ENCODINGS_PATH,
) -> None:
    with encodings_location.open(mode="rb") as f:
        loaded_encodings = pickle.load(f)

    cap = cv2.VideoCapture(0)  # Open the default camera
    recognized_names = set()  # Set to keep track of recognized names
    try:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                print("Failed to grab frame.")
                break

            # Convert the image from BGR color (which OpenCV uses) to RGB color
            rgb_frame = frame[:, :, ::-1]

            input_face_locations = face_recognition.face_locations(rgb_frame, model=model)
            input_face_encodings = face_recognition.face_encodings(rgb_frame, input_face_locations)

            for bounding_box, unknown_encoding in zip(input_face_locations, input_face_encodings):
                name = _recognize_face(unknown_encoding, loaded_encodings)
                if name and name not in recognized_names:
                    recognized_names.add(name)  # Add the name to the set of recognized names
                    log_recognition(name)  # Log the recognition event
                    send_put_request()

                if not name:
                    name = "Unknown"

                # Draw bounding box
                top, right, bottom, left = bounding_box
                cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)  # Red bounding box

                # Draw label
                cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
                font = cv2.FONT_HERSHEY_DUPLEX
                cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

            cv2.imshow('Frame', frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):  # Exit when 'q' is pressed
                break
    finally:
        cap.release()
        cv2.destroyAllWindows()

# encode_known_faces()  # Uncomment this when you add a new face.
recognize_faces_live()
