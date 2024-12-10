import tensorflow as tf
import numpy as np
import logging
import json
import mediapipe as mp
import cv2
import tempfile

from io import BytesIO
from PIL import Image

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

img_size = 32
max_hand_landmarks = 21 * 3 * 2

def pad_landmarks(landmarks, max_landmarks):
    if len(landmarks) < max_landmarks:
        return np.pad(landmarks, (0, max_landmarks - len(landmarks)), mode='constant')
    else:
        return landmarks[:max_landmarks]

def extract_hand_landmarks(image):
    hand_landmarks = []
    mp_hands = mp.solutions.hands
    
    image_np = np.array(image)
    
    with mp_hands.Hands(static_image_mode=True, max_num_hands=2) as hands:
        image_rgb = cv2.cvtColor(image_np, cv2.COLOR_BGR2RGB)
        hand_results = hands.process(image_rgb)

        if hand_results.multi_hand_landmarks:
            for hand_landmark in hand_results.multi_hand_landmarks:
                for lm in hand_landmark.landmark:
                    hand_landmarks.extend([lm.x, lm.y, lm.z])

                mp.solutions.drawing_utils.draw_landmarks(image_np, hand_landmark, mp_hands.HAND_CONNECTIONS)

    padded_hand_landmarks = pad_landmarks(hand_landmarks, max_hand_landmarks)
    return image_np, np.array(padded_hand_landmarks)

def process_image_and_landmarks(image):
    image_with_landmarks, hand_landmarks = extract_hand_landmarks(image)
    
    image_resized = cv2.resize(image_with_landmarks, (img_size, img_size)) / 255.0

    image_input = image_resized.reshape(1, img_size, img_size, 3)
    landmark_input = hand_landmarks.reshape(1, max_hand_landmarks)
    
    return image_input, landmark_input, image_with_landmarks

def load_model(model_url, model_name):
    try:
        model_path = tf.keras.utils.get_file(model_name, origin=model_url)
        model = tf.keras.models.load_model(model_path)
        return model
    except Exception as e:
        raise Exception(f"Error loading the model: {str(e)}")

def predict_class(image_input, landmark_input):
    model = load_model('https://storage.googleapis.com/another-file-deployment/model/gfgModelLM.h5', 'gfgModelLM.h5')
    
    predicted_class_probabilities = model.predict([landmark_input, image_input])
    predicted_class = np.argmax(predicted_class_probabilities, axis=1)

    with open("encode.json", "r") as f:
        class_names = json.load(f)
    
    predicted_label = class_names[str(predicted_class[0])]
    return predicted_label

def read_image(file: bytes) -> Image.Image:
    try:
        pil_image = Image.open(BytesIO(file))
        return cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
    except Exception as e:
        logger.error(f"Error reading image: {e}")
        raise e

async def predict_gesture(image: bytes):
    try:
        image_input, landmark_input, image_with_landmarks = process_image_and_landmarks(image)
        
        predicted_label = predict_class(image_input, landmark_input)
        
        if isinstance(image_with_landmarks, np.ndarray):
            image_with_landmarks = Image.fromarray(image_with_landmarks)
        
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".jpg")
        image_with_landmarks.save(temp_file, format="JPEG")
        temp_file.close()
        
        return {
            "prediction": predicted_label,
            "image": temp_file.name
        }
    except Exception as e:
        logger.error(f"Error predicting gesture: {e}")
        raise e