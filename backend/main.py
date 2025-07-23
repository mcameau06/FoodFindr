from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def main(query:str):

    if "spicy" or "hamburgers" in query.lower:
        return {'food':["chipotle","burger king","whole foods"]}
    else:
        return {'food':["Wendys","99 Restaurant","Legal Seafoods"]}

