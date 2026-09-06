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


# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# TensorFlow CPU Configuration
# ---------------------------------------------------------

try:
    tf.config.threading.set_intra_op_parallelism_threads(2)
    tf.config.threading.set_inter_op_parallelism_threads(2)
except Exception as e:
    print("TensorFlow threading configuration warning:", e)


# ---------------------------------------------------------
# Model
# ---------------------------------------------------------

MODEL_PATH = (
    Path(__file__).resolve().parent.parent
    / "models"
    / "ewaste_classifier.keras"
)

print(f"Loading model from: {MODEL_PATH}")

try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("AI model loaded successfully.")
except Exception as e:
    print("Failed to load AI model:", e)
    raise


# ---------------------------------------------------------
# Model Warm-up
# ---------------------------------------------------------

try:
    dummy_input = np.zeros(
        (1, 224, 224, 3),
        dtype=np.float32
    )

    model(dummy_input, training=False)

    print("AI model warm-up completed.")

except Exception as e:
    print("Model warm-up warning:", e)


# ---------------------------------------------------------
# Classes
# ---------------------------------------------------------

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


# ---------------------------------------------------------
# Root Route
# ---------------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "RecyLink AI Service is running"
    }


# ---------------------------------------------------------
# Health Check
# ---------------------------------------------------------

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": True
    }


# ---------------------------------------------------------
# Prediction
# ---------------------------------------------------------

@app.post("/predict")
async def predict(
    image: UploadFile = File(...),
    condition: str = Form(...)
):

    # Validate condition
    if not condition.strip():
        raise HTTPException(
            status_code=400,
            detail="Condition must not be empty."
        )

    # Validate file type
    if (
        not image.content_type
        or not image.content_type.startswith("image/")
    ):
        raise HTTPException(
            status_code=400,
            detail="Uploaded file must be an image."
        )

    # Read image into memory
    image_bytes = await image.read()

    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="Uploaded image is empty."
        )

    # Open image
    try:
        img = Image.open(
            BytesIO(image_bytes)
        ).convert("RGB")

    except UnidentifiedImageError:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is not a valid image."
        )

    # Resize to model input size
    img = img.resize(
        (224, 224),
        Image.Resampling.BILINEAR
    )

    # Convert image to NumPy array
    img_array = np.asarray(
        img,
        dtype=np.float32
    )

    # Add batch dimension
    img_array = np.expand_dims(
        img_array,
        axis=0
    )

    # -----------------------------------------------------
    # AI Inference
    # -----------------------------------------------------

    try:
        # Direct model call is faster than model.predict()
        predictions = model(
            img_array,
            training=False
        ).numpy()

    except Exception as e:
        print("Model prediction error:", e)

        raise HTTPException(
            status_code=500,
            detail="AI model prediction failed."
        )

    # -----------------------------------------------------
    # Classification
    # -----------------------------------------------------

    predicted_index = int(
        np.argmax(predictions[0])
    )

    predicted_class = CLASSES[
        predicted_index
    ]

    classification_confidence = float(
        predictions[0][predicted_index]
    )


    # -----------------------------------------------------
    # Non E-Waste
    # -----------------------------------------------------

    if predicted_class == "Non-E-Waste":

        return {
            "category": predicted_class,
            "classification_confidence": classification_confidence,
            "recommendation": "NOT_E_WASTE",
            "reason": (
                "The uploaded image appears to be "
                "non-electronic waste."
            )
        }


    # -----------------------------------------------------
    # Repairability Assessment
    # -----------------------------------------------------

    try:

        repairability_result = assess_repairability(
            predicted_class,
            condition
        )

    except Exception as e:

        print(
            "Repairability assessment error:",
            e
        )

        raise HTTPException(
            status_code=500,
            detail="Repairability assessment failed."
        )


    # -----------------------------------------------------
    # Final Response
    # -----------------------------------------------------

    return {
        "category": predicted_class,
        "classification_confidence": classification_confidence,
        **repairability_result
    }