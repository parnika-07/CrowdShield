from camera_service import process_video
 
VIDEO_PATH = r"C:\Users\HP\OneDrive - Nalanda Educational Institutions\Desktop\crowd\vdo.mp4"
 
counts = process_video(VIDEO_PATH)
 
print("\n======================")
print("CAMERA RESULTS")
print("======================")
 
print("Number of readings:", len(counts))
print("Crowd readings:")
print(counts)