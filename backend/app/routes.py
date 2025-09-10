from main import app
from google_maps import search_nearby_places, format_search_places_response
from typing import List
from models import SearchResponse
from fastapi import HTTPException

@app.get("/search", response_model=List[SearchResponse])
async def search(query:str, lat:float,lng:float):
    raw_json = search_nearby_places(query,lat,lng)

    if 'error' in raw_json:
        raise HTTPException(status_code=500, detail=raw_json['error'])

    return format_search_places_response(raw_json)
