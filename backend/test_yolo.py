from ultralytics import YOLO
import cv2

print("Loading YOLO...")

model = YOLO("yolo11n.pt")
d  
video_path = r"C:\Users\HP\OneDrive - Nalanda Educational Institutions\Desktop\crowd\vdo.mp4"

cap = cv2.VideoCapture(video_path)

ret, frame = cap.read()

if not ret:
    print("❌ Could not read video")
    cap.release()
    exit()

results = model(frame, verbose=False)

people_count = 0

for box in results[0].boxes:
    class_id = int(box.cls[0])

    if class_id == 0:
        people_count += 1

print("✅ YOLO working!")
print("👥 People detected:", people_count)

cap.release()