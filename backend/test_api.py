import requests
 
VIDEO_PATH = r"C:\Users\HP\OneDrive - Nalanda Educational Institutions\Desktop\crowd\vdo.mp4"
 
data = {
    "zone_id": "A",
    "video_path": VIDEO_PATH,
    "capacity": 12
}
 
response = requests.post(
    "http://127.0.0.1:8000/camera/process",
    json=data
)
 
print("Status code:", response.status_code)
print("\nCrowdShield Response:")
print(response.json())