from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import credentials, firestore, storage
from predict import read_image, predict_gesture
from PIL import Image

import os
import datetime
import uuid
import requests
import logging
import firebase_admin
import tempfile
import numpy as np

###
import dotenv
dotenv.load_dotenv()

url = os.getenv("CREDENTIALS_URL")
###

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
    bucket = storage.bucket(name='signify-443314.appspot.com')
    logger.info("Connected to Firestore successfully.")
except Exception as e:
    logger.error(f"Error connecting to Firestore: {e}")

def upload_image_to_firebase(image_path):
    """
    Mengupload gambar ke Firebase Storage.
    """
    blob = bucket.blob('images/' + os.path.basename(image_path))
    blob.upload_from_filename(image_path)
    blob.make_public()
    return blob.public_url

from PIL import Image
import numpy as np

def save_temp_image(image):
    """
    Menyimpan gambar ke file sementara.
    """
    if isinstance(image, np.ndarray):
        image = Image.fromarray(image)
    
    if isinstance(image, Image.Image):
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".jpg")
        image.save(temp_file, format='JPEG')
        temp_file.close()
        return temp_file.name
    else:
        raise ValueError("Input image must be a PIL Image or numpy.ndarray")

@app.post("/predict")
async def predict_endpoint(file: UploadFile = File(...)):
    try:
        image = read_image(await file.read())
        logger.info("Image read successfully.")

        predict_image = await predict_gesture(image)
        logger.info(f"Prediction result: {predict_image}")

        try:
            if isinstance(predict_image['image'], np.ndarray):
                image_with_landmarks = Image.fromarray(predict_image['image'])
            else:
                image_with_landmarks = Image.open(predict_image['image'])

            temp_image_path = save_temp_image(image_with_landmarks)

            image_url = upload_image_to_firebase(temp_image_path)
            os.remove(temp_image_path)

            doc_ref = db.collection("predictions").document(str(uuid.uuid4()))
            doc_ref.set({
                "prediction": predict_image['prediction'],
                "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "image": image_url
            })

            logger.info("Prediction saved to Firestore.")
        except Exception as e:
            logger.error(f"Firestore save error: {e}", exc_info=True)
            raise HTTPException(status_code=500, detail="Error saving prediction to Firestore")

        return JSONResponse(content={
            "message": "Prediction successful.", 
            "detection": predict_image['prediction'],
            "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "image": image_url
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