from dotenv import load_dotenv
import os
import requests
from fastapi.responses import RedirectResponse

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")


def search_nearby_places(query:str, lat:float, lng:float):
    url= f"https://maps.googleapis.com/maps/api/place/textsearch/json"
    
    params = {
        "radius":500,
        'location': f'{lat},{lng}',
        'query':query,
        'type':"food",
        'key':api_key,
    }
    try:

        response = requests.get(url,params=params)
        response.raise_for_status()
        return response.json()
    
    except Exception as e:
        print("Error",e)
        return{'error':f'Failed to fetch results, {response.status_code}'}

def format_search_places_response(raw_json):
    formatted = []

    
    for place in raw_json.get("results", []):
        formatted.append({
            "name": place.get("name"),
            "address": place.get("formatted_address"),
            "lat": place.get("geometry", {}).get("location", {}).get("lat"),
            "lng": place.get("geometry", {}).get("location", {}).get("lng"),
            "rating": place.get("rating"),
            "user_ratings_total": place.get("user_ratings_total"),
            # can use to find place info
            "place_id": place.get("place_id"),
            "open_now": bool(place.get("opening_hours", {}).get("open_now")),
            "types": place.get("types", [])
        })
    return formatted

def get_photo_url(photo_reference, max_width=400):
    if not photo_reference:
        return None
    return f"https://maps.googleapis.com/maps/api/place/photo?maxwidth={max_width}&photo_reference={photo_reference}&key={api_key}"


    

raw_json = search_nearby_places('home depot',42.18383,-71.028412)
raw_json2 = search_nearby_places('olive garden',42.18383,-71.028412)
#print(raw_json)
#print(raw_json2)
#print(text_search_places_response(raw_json))