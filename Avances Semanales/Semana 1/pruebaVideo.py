import cv2

# Load the pre-trained Haar Cascade classifier for face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_alt2.xml')

# Open a video file or capture from a camera
video_capture = cv2.VideoCapture(0)  # 0 indicates the default camera


best_face = None
best_score = 0

while True:
    # Read a frame from the video
    ret, frame = video_capture.read()
    if not ret:
        break  # Break the loop if no more frames are available

    # Convert the frame to grayscale for face detection
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect faces in the frame
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    for (x, y, w, h) in faces:
        # Calculate a quality score (e.g., area of the face)
        score = w * h

        # If the current face has a higher score, update the best face
        if score > best_score:
            best_score = score
            best_face = frame[y:y+h, x:x+w]

    # Display the frame with rectangles around detected faces (optional)
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 0, 255), 2)

    cv2.imshow('Video', frame)

    # Break the loop if the 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Save the best-cropped face as an image
if best_face is not None:
    #cv2.imshow('Best Face', best_face)
    print(best_score)
    cv2.imwrite('best_face.jpg', best_face)

# Release the video capture and close all windows
video_capture.release()
cv2.destroyAllWindows()
