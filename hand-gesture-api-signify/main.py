from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import credentials, firestore
from predict import read_image, predict_gesture

import os
import time
import uuid
import requests
import logging
import firebase_admin
import dotenv

dotenv.load_dotenv()

url = os.environ.get("CREDENTIALS_URL")
response = requests.get(url)
if response.status_code == 200:
    with open("credentials.json", "wb") as file:
        file.write(response.content)
else:
    raise Exception(f"Failed to download the file. Status code: {response.status_code}")

cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

try:
    db = firestore.client()
    logger.info("Connected to Firestore successfully.")
except Exception as e:
    logger.error(f"Error connecting to Firestore: {e}")

@app.get("/")
async def root():
    return {"message": "Hello Signify!"}

@app.post("/predict")
async def predict_endpoint(file: UploadFile = File(...)):
    try:
        image = read_image(await file.read())
        logger.info("Image read successfully.")
        
        predict_image = await predict_gesture(image)
        logger.info(f"Prediction result: {predict_image}")

        try:
            doc_ref = db.collection("predictions").document(str(uuid.uuid4()))

            doc_ref.set({
                "prediction": predict_image['prediction'],
                "timestamp": time.strftime("%m/%d/%Y, %H:%M:%S")
            })
            
            logger.info("Prediction saved to Firestore.")
        except Exception as e:
            logger.error(f"Firestore save error: {e}", exc_info=True)
            raise HTTPException(status_code=500, detail="Error saving prediction to Firestore")
        
        return JSONResponse(content={
            "message": "Prediction successful.", 
            "detection": predict_image['prediction'],
            "timestamp": time.strftime("%m/%d/%Y, %H:%M:%S")
        })
    except HTTPException:
        raise  
    except Exception as e:
        logger.error(f"Unexpected error in predict_endpoint: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Unexpected internal server error")

if __name__ == "__main__":
    import uvicorn
    import os
    uvicorn.run(port=int(os.environ.get("PORT", 8080)), host='0.0.0.0', debug=True)