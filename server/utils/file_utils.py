import zipfile
import os

def create_zip(files, zip_path):
    with zipfile.ZipFile(zip_path, 'w') as zipf:
        for file_path in files:
            filename = os.path.basename(file_path)
            zipf.write(file_path, arcname=filename)