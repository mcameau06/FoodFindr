from main import app
from google_maps import search_nearby_places, format_search_places_response
@app.get("/")
def main(query:str):

    if "spicy" or "hamburgers" in query.lower:
        return {'food':["chipotle","burger king","whole foods"]}
    else:
        return {'food':["Wendys","99 Restaurant","Legal Seafoods"]}

@app.get("/search")
async def search(query:str, lat:float,lng:float):
    raw_json = search_nearby_places(query,lat,lng)

    return format_search_places_response(raw_json)


