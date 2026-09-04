from pathlib import Path
import shutil
import random

SOURCE_DIR = Path("AI-SERVICE/training_data")

DEST_DIR = Path("AI-SERVICE/training_data_balanced")

if DEST_DIR.exists():
    shutil.rmtree(DEST_DIR)

DEST_DIR.mkdir(parents=True)

for class_dir in SOURCE_DIR.iterdir():

    if not class_dir.is_dir():
        continue

    if class_dir.name == "Non-E-Waste":
        continue

    destination = DEST_DIR / class_dir.name

    shutil.copytree(
        class_dir,
        destination
    )

non_ewaste_source = SOURCE_DIR / "Non-E-Waste"
non_ewaste_destination = DEST_DIR / "Non-E-Waste"

non_ewaste_destination.mkdir()


all_images = [
    file
    for file in non_ewaste_source.iterdir()
    if file.is_file()
]


random.seed(42)

selected_images = random.sample(
    all_images,
    400
)


for image in selected_images:

    shutil.copy2(
        image,
        non_ewaste_destination / image.name
    )


print("Balanced dataset created successfully!")
print(f"Location: {DEST_DIR}")
print(f"Non-E-Waste images: {len(selected_images)}")