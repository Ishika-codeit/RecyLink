import random
from pathlib import Path

import tensorflow as tf

MODEL_PATH = "AI-SERVICE/models/ewaste_classifier.keras"

model = tf.keras.models.load_model(MODEL_PATH)

print("Model loaded successfully!")

DATASET_DIR = Path("AI-SERVICE/training_data_balanced")

classes = sorted([
    folder.name
    for folder in DATASET_DIR.iterdir()
    if folder.is_dir()
])

print("\nClasses:")

for i, class_name in enumerate(classes):
    print(i, class_name)

def predict_image(image_path):

    
    img = tf.keras.utils.load_img(
        image_path,
        target_size=(224, 224)
    )

    
    img_array = tf.keras.utils.img_to_array(img)

    img_array = tf.expand_dims(img_array, axis=0)

    
    predictions = model.predict(
        img_array,
        verbose=0
    )

    predicted_index = tf.argmax(
        predictions[0]
    ).numpy()

    predicted_class = classes[predicted_index]

    confidence = predictions[0][predicted_index]

    return predicted_class, confidence


IMAGES_PER_CLASS = 10

total_images = 0
correct_predictions = 0


for actual_class in classes:

    class_dir = DATASET_DIR / actual_class

    images = list(class_dir.glob("*"))

    
    test_images = random.sample(
        images,
        min(IMAGES_PER_CLASS, len(images))
    )

    print(f"\n--- Testing {actual_class} ---")

    class_correct = 0

    for image_path in test_images:

        predicted_class, confidence = predict_image(
            image_path
        )

        total_images += 1

    
        if predicted_class == actual_class:
            correct_predictions += 1
            class_correct += 1

        print(
            f"{image_path.name} -> "
            f"{predicted_class} "
            f"({confidence * 100:.2f}%)"
        )

    
    class_accuracy = (
        class_correct / len(test_images)
    ) * 100

    print(
        f"{actual_class} accuracy: "
        f"{class_correct}/{len(test_images)} "
        f"({class_accuracy:.2f}%)"
    )


overall_accuracy = (
    correct_predictions / total_images
) * 100


print("\n==============================")
print("FINAL TEST RESULT")
print("==============================")

print(
    f"Correct: "
    f"{correct_predictions}/{total_images}"
)

print(
    f"Accuracy: "
    f"{overall_accuracy:.2f}%"
)