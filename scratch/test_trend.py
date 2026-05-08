import requests
import json

# Yerel sunucu adresin (Genelde 3000 veya 3004)
PORT = 3000 
URL = f"http://localhost:{PORT}/api/automation/process-trend"

sample_trend = {
    "title": "Viral Sunset Lamp - The Ultimate Room Decor",
    "videoUrl": "https://v16-webapp.tiktok.com/dummy-video-link",
    "thumbnailUrl": "https://images.unsplash.com/photo-1619191163420-4a7c0f98f904?auto=format&fit=crop&q=80&w=800",
    "platform": "TikTok",
    "platformId": "73628192736152",
    "views": 1500000,
    "rawCaption": "You need this sunset lamp for your bedroom! #sunsetlamp #roomdecor #viralproduct"
}

print(f"Sending first trend: {sample_trend['title']}")

try:
    response = requests.post(URL, json=sample_trend)
    if response.status_code == 200:
        result = response.json()
        print("SUCCESS!")
        print(f"Blog Title: {result.get('trend', {}).get('title')}")
        print(f"Slug: {result.get('trend', {}).get('slug')}")
        print("\nNow you can refresh the /blog page!")
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
except Exception as e:
    print(f"Connection error: {str(e)}")
