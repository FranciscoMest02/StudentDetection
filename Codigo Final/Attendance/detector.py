# Import necessary libraries
import cv2
import face_recognition
from pathlib import Path
import pickle
from collections import Counter
import requests
import shutil
import datetime
import pytz
import tkinter as tk

# Path to store facial encodings
DEFAULT_ENCODINGS_PATH = Path("../output/encodings.pkl")

# Set to keep track of names logged for today
logged_today = set()

# Function to capture a face image using the default camera
def capture_face_image(output_dir: Path):
    cap = cv2.VideoCapture(0)  # Initialize camera
    try:
        while cap.isOpened():
            ret, frame = cap.read() # Read a frame from the camera
            if not ret:
                print("Failed to grab frame.")
                break

            cv2.imshow('Frame', frame) # Display the frame

            # Capture image when 'c' is pressed
            if cv2.waitKey(1) & 0xFF == ord('c'):
                # Save the captured image to the output directory
                file_path = output_dir / f"{len(list(output_dir.glob('*.jpg'))):04d}.jpg"
                cv2.imwrite(str(file_path), frame)
                print(f"Image saved to {file_path}")
                break
    finally:
        # Release the camera and close all OpenCV windows
        cap.release()
        cv2.destroyAllWindows()

# Function to get a person's name from input
def get_person_name():
    name = input("Enter the name of the person: ")
    return name

# Function to organize the captured image into a directory
def organize_captured_image(name, captured_image_path):
    # Create a directory for the person if it doesn't exist
    target_dir = Path(f"training/{name}")
    target_dir.mkdir(parents=True, exist_ok=True)
    # Move the captured image to the person's directory
    target_file_path = target_dir / captured_image_path.name
    shutil.move(captured_image_path, target_file_path)

# Function to save a new student's information to a database
def save_new_student_db(name):
    # API endpoint to post new student data
    url = 'https://class-insight.vercel.app/api/students/newstudent'
    # Data payload containing the student's information
    payload = {
        "name": name,
        "courses": [],
        "participation": [],
        "attendance": [],
    }
    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.post(url, json=payload, headers=headers)
    print(response.content)

    # Check response status and print appropriate message
    if response.status_code == 200:
        print('POST New student request successful:', response.text)
        data = response.json()
        return data["id"]
    else:
        print('Failed to send POST New student request:', response.text)

# Function to register a new face in the system
def register_new_face():
    output_dir = Path("temp")
    output_dir.mkdir(parents=True, exist_ok=True)
    # Capture a face image
    capture_face_image(output_dir)
    # Get the person's name and save their data
    name = get_person_name()
    id_student = save_new_student_db(name)
    captured_image_path = list(output_dir.glob('*.jpg'))[0]
    # Organize the captured image and encode known faces
    organize_captured_image(id_student, captured_image_path)
    encode_known_faces()
    shutil.rmtree(output_dir)  # Remove temporary directory
    quit()

# Function to encode known faces from training images
def encode_known_faces(
    model: str = "hog", encodings_location: Path = DEFAULT_ENCODINGS_PATH
) -> None:
    """
    Loads images in the training directory and builds a dictionary of their
    names and encodings.
    """
    names = []
    encodings = []
    # Load each image and extract face encodings
    for filepath in Path("training").glob("*/*"):
        name = filepath.parent.name
        image = face_recognition.load_image_file(filepath)

        face_locations = face_recognition.face_locations(image, model=model)
        face_encodings = face_recognition.face_encodings(image, face_locations)

        for encoding in face_encodings:
            names.append(name)
            encodings.append(encoding)

    # Save the encodings
    name_encodings = {"names": names, "encodings": encodings}
    with encodings_location.open(mode="wb") as f:
        pickle.dump(name_encodings, f)

# Check if a name has been logged today
def has_been_logged_today(name):
    today = datetime.datetime.now(monterrey_timezone).strftime('%Y-%m-%d')
    return (name, today) in logged_today

# Function to get student information from the server
def get_students_info():
    url = 'https://class-insight.vercel.app/api/students/getstudentsinfo'

    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        print('GET Students info request successful:', response.text)
    else:
        print('GET Students info request failed:', response.text)

# Function to send a PUT request to update attendance
def send_put_request(id_identified, courseId):

    url = 'https://class-insight.vercel.app/api/students/attendance/' + id_identified
    payload = {
        "courseId": courseId,
        "date": str(datetime.datetime.now(monterrey_timezone))
    }
    print({id_identified})
    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.put(url, json=payload, headers=headers)
    if response.status_code == 200:
        print('PUT request successful:', response.text)
    else:
        print('Failed to send PUT request:', response.text)

# Log a recognition event
def log_recognition(name):
    today = datetime.datetime.now(monterrey_timezone).strftime('%Y-%m-%d')
    if not has_been_logged_today(name):
        with open('attendance.txt', 'a') as attendance_file:
            attendance_file.write(f'{today}, {name}\n')
        logged_today.add((name, today))  # Add the name and date to the set

# Internal function to recognize a face from encodings
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

# Function to recognize faces in real-time using the camera
def recognize_faces_live(
    model: str = "hog",
    encodings_location: Path = DEFAULT_ENCODINGS_PATH,
) -> None:
    with encodings_location.open(mode="rb") as f:
        loaded_encodings = pickle.load(f)

    cap = cv2.VideoCapture(0)  # Initialize camera
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
                id_identified = _recognize_face(unknown_encoding, loaded_encodings)
                if id_identified and id_identified not in recognized_names:
                    recognized_names.add(id_identified)  # Add the name to the set of recognized names
                    log_recognition(id_identified)  # Log the recognition event
                    send_put_request(id_identified, "653935f89bfbfe7d1cb04992")

                if not id_identified:
                    id_identified = "Unknown"

                # Draw bounding box and label on the frame
                top, right, bottom, left = bounding_box
                cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)  # Red bounding box
                cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
                font = cv2.FONT_HERSHEY_DUPLEX
                cv2.putText(frame, id_identified, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

            cv2.imshow('Frame', frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):  # Exit when 'q' is pressed
                break
    finally:
        cap.release()
        cv2.destroyAllWindows()


# Setup timezone for Monterrey
monterrey_timezone = pytz.timezone('America/Monterrey')

# Create the main window
root = tk.Tk()
root.title("Face Recognition App")
root.configure(bg='lightgray')  # Neutral background color for the window

# Set the size of the window
root.geometry('600x400')  # Increased window size

# Create a frame to center the buttons
frame = tk.Frame(root, bg='lightgray')
frame.place(relx=0.5, rely=0.5, anchor='center')

# Create and add the first button
button1 = tk.Button(frame, text="Register New Face", command=register_new_face, height=3, width=20,
                    bg='red', fg='black', font=('Helvetica', 20, 'bold'))
button1.pack(pady=10)

# Create and add the second button
button2 = tk.Button(frame, text="Start Live Recognition", command=recognize_faces_live, height=3, width=20,
                    bg='lime green', fg='black', font=('Helvetica', 20, 'bold'))
button2.pack(pady=10)

# Run the application
root.mainloop()
