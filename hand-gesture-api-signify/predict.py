import tensorflow as tf
import numpy as np
import logging
import json

from PIL import Image
from io import BytesIO

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_model(model_url, model_name):
    try:
        model_path = tf.keras.utils.get_file(model_name, origin=model_url)
        model = tf.keras.models.load_model(model_path)
        return model
    except Exception as e:
        logger.error(f"Error loading {model_name}: {e}")
        raise e
    
model = load_model('https://storage.googleapis.com/another-file-deployment/model/gfgModel.h5', 'gfgModel.h5')

def read_image(file: bytes) -> Image.Image:
    try:
        pil_image = Image.open(BytesIO(file))
        return pil_image
    except Exception as e:
        logger.error(f"Error reading image: {e}")
        raise e
    
async def predict_gesture(image: Image.Image):
    try:
        with open('encode.json', 'r') as file:
            encode = json.load(file)
        
        img = image.convert('RGB')
        img = img.resize((32, 32))
        img_array = np.array(img) / 255.0
        img_batch = np.expand_dims(img_array, axis=0)

        prediction = model.predict(img_batch)
        prediction = np.argmax(prediction, axis=1)[0]
        prediction = encode[str(prediction)]

        data = {"prediction": prediction}

        return data
    except Exception as e:
        logger.error(f"Error in predict function: {e}")
        raise e