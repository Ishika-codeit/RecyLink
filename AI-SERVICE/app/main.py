from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import numpy as np
from PIL import Image, UnidentifiedImageError
import tensorflow as tf
from pathlib import Path

import sys
sys.path.append("AI-SERVICE")

from repairability import assess_repairability


app = FastAPI(
    title="RecyLink AI Service",
    description="AI service for e-waste classification and repairability assessment",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


MODEL_PATH = Path("AI-SERVICE/models/ewaste_classifier.keras")

model = tf.keras.models.load_model(MODEL_PATH)


CLASSES = [
    "Battery",
    "Keyboard",
    "Microwave",
    "Mobile",
    "Mouse",
    "Non-E-Waste",
    "PCB",
    "Player",
    "Printer",
    "Television",
    "Washing Machine",
]


@app.get("/")
def root():
    return {
        "message": "RecyLink AI Service is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": True
    }


@app.post("/predict")
async def predict(
    image: UploadFile = File(...),
    condition: str = Form(...)
):

    if not condition.strip():
        raise HTTPException(
            status_code=400,
            detail="Condition must not be empty."
        )

    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Uploaded file must be an image."
        )

    image_bytes = await image.read()

    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="Uploaded image is empty."
        )

    try:
        img = Image.open(BytesIO(image_bytes)).convert("RGB")
    except UnidentifiedImageError:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is not a valid image."
        )

    img = img.resize((224, 224))

    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array, verbose=0)

    predicted_index = int(np.argmax(predictions[0]))
    predicted_class = CLASSES[predicted_index]

    classification_confidence = float(
        predictions[0][predicted_index]
    )

    if predicted_class == "Non-E-Waste":
        return {
            "category": predicted_class,
            "classification_confidence": classification_confidence,
            "recommendation": "NOT_E_WASTE",
            "reason": "The uploaded image appears to be non-electronic waste."
        }

    
    repairability_result = assess_repairability(
        predicted_class,
        condition
    )

    return {
        "category": predicted_class,
        "classification_confidence": classification_confidence,
        **repairability_result
    }