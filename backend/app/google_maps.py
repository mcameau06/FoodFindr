import requests
from fastapi.responses import RedirectResponse
from config import Config 
from utils.keywords import ValidTypes

api_key = Config.GOOGLE_API_KEY

def search_by_text_places(query:str, lat:float, lng:float):
    url= f"https://maps.googleapis.com/maps/api/place/textsearch/json"
    
    params = {
        'location': f'{lat},{lng}',
        'query':query,
        #'types':"food",
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
    keywords = set(ValidTypes.FOOD_TYPES)
    formatted = []
    
    for place in raw_json.get("results", []):

        place_types = place.get("types",[])

        is_food_place = bool(keywords.intersection(place_types))
        
        if is_food_place:
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
