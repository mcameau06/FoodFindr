import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:

    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")