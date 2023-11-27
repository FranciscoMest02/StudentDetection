# Import the necessary libraries
import cv2
import face_recognition
import mediapipe as mp
import numpy as np
import csv
import datetime
import pickle
import requests

# Load face encodings from the file
with open('../output/encodings.pkl', 'rb') as f:
    data = pickle.load(f)
known_face_encodings = data['encodings']
known_face_names = data['names']

# Function to display available courses and let the user select one
def showCourses():
    url = "https://class-insight.vercel.app/api/getCourses"
    response = requests.get(url)
    courses_dict = {}

    if response.status_code == 200:
        # Create a dictionary with available courses
        for course in response.json():
            courses_dict[course["name"]] = course["_id"]

        print("Cursos disponibles: \n")
        for course in courses_dict:
            print(f"- {course}")

        while True:
            current_course = input("Ingresa el nombre del curso: ")
            if current_course in courses_dict:
                course_key = courses_dict[current_course]
                return (course_key,current_course)
            else:
                print("Curso no válido. Por favor, ingresa un nombre de curso válido.")

    else:
        # Print an error message if the request was not successful
        print(f"Request failed with status code {response.status_code}")

# Configure the frame processing frequency
PROCESS_EVERY_N_FRAMES = 5

# Load YOLOv3 model for object detection
net = cv2.dnn.readNet(r"yolov3.weights", r"yolov3.cfg")
layer_names = net.getLayerNames()
output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers().flatten()]

# Initialize MediaPipe solutions for pose and hand tracking
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(model_complexity=0)
mp_hands = mp.solutions.hands
hands = mp_hands.Hands()

# Prompt user to select a course
current_course = showCourses()

# Open the default camera
cap = cv2.VideoCapture(0)
net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

# Initialize a CSV file to log hand raises
with open('hand_raises.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["Timestamp", "Name"])

# Initialize dictionaries to track hand raises and participation
hand_states = {}
participation_count = {}

# Define a cooldown period for hand raises
HAND_RAISE_COOLDOWN = datetime.timedelta(seconds=10)  # A timedelta representing 10 seconds
last_hand_raise_time = {}

# Function to create a JSON payload for the API request
def create_json(participation_count,current_course):
    mydict = {"course":current_course[1],
              "courseId": current_course[0],
              "students":[]}

    for key in participation_count:
        new_student = {"studentId": key, "participations": participation_count[key]}

        if new_student["studentId"] != "Unknown":
            mydict["students"].append(new_student)

    return mydict


# Function to send participation data to the server
def send_put_request(data):
    url = 'https://class-insight.vercel.app/api/students/participations'
    payload = data
    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.put(url, json=payload, headers=headers)
    if response.status_code == 200:
        print('PUT request successful:', response.text)
    else:
        print('Failed to send PUT request:', response.text)


# Main loop for processing video frames
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Cambiamos el tamaño del frame para que se procese más rápido
    #frame = cv2.resize(frame, (500, 250))

    # Preprocess the frame for YOLOv3
    height, width, channels = frame.shape
    blob = cv2.dnn.blobFromImage(frame, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outs = net.forward(output_layers)

    # Initialize lists for storing detection data
    class_ids = []
    confidences = []
    boxes = []

    # Process YOLOv3 outputs
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.5:
                # Compute box coordinates
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)
                x = int(center_x - w / 2)
                y = int(center_y - h / 2)

                # Add detection to lists
                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)

    # Perform non-maximum suppression to remove duplicate boxes
    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)

    # Process detected faces
    face_names = []
    for i in range(len(boxes)):
        if i in indexes:
            x, y, w, h = boxes[i]
            crop_img = frame[y:y + h, x:x + w]
            if crop_img.size == 0:
                continue

            # Convert cropped image to RGB and detect faces
            frame_rgb = cv2.cvtColor(crop_img, cv2.COLOR_BGR2RGB)
            face_locations = face_recognition.face_locations(frame_rgb)
            face_encodings = face_recognition.face_encodings(frame_rgb, face_locations)

            # Identify faces in the cropped image
            face_names = []   # Initialize list for current face detection
            for face_encoding in face_encodings:
                distances = face_recognition.face_distance(known_face_encodings, face_encoding)
                best_match_index = np.argmin(distances)
                name = "Unknown"
                if distances[best_match_index] <= 0.6:
                    name = known_face_names[best_match_index]
                face_names.append(name)

            # Initializing state variables for each detected face
            for name in face_names:
                if name not in hand_states:
                    hand_states[name] = None
                if name not in last_hand_raise_time:
                    last_hand_raise_time[name] = None

            # Drawing bounding boxes and labeling detected faces in the frame
            for (top, right, bottom, left), name in zip(face_locations, face_names):
                cv2.rectangle(frame, (left + x, top + y), (right + x, bottom + y), (0, 0, 255), 2)
                font = cv2.FONT_HERSHEY_DUPLEX
                cv2.putText(frame, name, (left + 6 + x, bottom - 6 + y), font, 0.5, (255, 255, 255), 1)

            # Processing the cropped image for pose estimation
            pose_results = pose.process(frame_rgb)

            if pose_results.pose_landmarks:

                # Iterate over both hands to check if they are raised
                for hand_label, shoulder_idx, elbow_idx, wrist_idx in [('Left', mp_pose.PoseLandmark.LEFT_SHOULDER, mp_pose.PoseLandmark.LEFT_ELBOW, mp_pose.PoseLandmark.LEFT_WRIST),
                                                                       ('Right', mp_pose.PoseLandmark.RIGHT_SHOULDER, mp_pose.PoseLandmark.RIGHT_ELBOW, mp_pose.PoseLandmark.RIGHT_WRIST)]:

                    # Get coordinates of shoulder, elbow, and wrist
                    shoulder = pose_results.pose_landmarks.landmark[shoulder_idx]
                    elbow = pose_results.pose_landmarks.landmark[elbow_idx]
                    wrist = pose_results.pose_landmarks.landmark[wrist_idx]

                    # Checking if the hand is raised based on the relative positions of shoulder, elbow, and wrist
                    if elbow.y <= (shoulder.y * 0.8) and wrist.y < shoulder.y and wrist.y < elbow.y:
                        for name in face_names:
                            current_time = datetime.datetime.now()
                            if name not in hand_states:
                                hand_states[name] = False

                            if name not in last_hand_raise_time:
                                last_hand_raise_time[name] = None

                            if name not in participation_count:
                                participation_count[name] = []

                            # Check if the cooldown has passed
                            last_raise = last_hand_raise_time[name]
                            hand_raised = hand_states[name]

                            # Log new hand raise if cooldown has passed
                            if hand_raised and (last_raise is None or (current_time - last_raise) > HAND_RAISE_COOLDOWN):
                                hand_states[name] = False

                            # Now check if we should log a new hand raise
                            if not hand_states[name] and (last_raise is None or (current_time - last_raise) > HAND_RAISE_COOLDOWN):
                                print(f"{name} raised hand!")
                                cv2.putText(frame, f"{name} raised hand!", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
                                last_hand_raise_time[name] = current_time
                                hand_states[name] = True
                                participation_count[name].append(str(current_time))
                    else:
                        for name in face_names:
                            hand_states[name] = False

            # Draw pose landmarks on the annotated image
            annotated_image = crop_img.copy()
            mp.solutions.drawing_utils.draw_landmarks(annotated_image, pose_results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
            frame[y:y+h, x:x+w] = annotated_image

    cv2.imshow('Video', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        participations = create_json(participation_count, current_course)
        if len(participations["students"]) > 0:
            send_put_request(participations)
            print(participations)
        break

cap.release()
cv2.destroyAllWindows()
