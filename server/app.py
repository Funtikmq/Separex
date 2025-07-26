from flask import Flask, send_file, request
from flask_cors import CORS
import os
from services.pdf_service import generate_pdf
from services.dxf_service import generate_dxf
from utils.file_utils import create_zip

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
FILES_DIR = os.path.join(BASE_DIR, "files")
os.makedirs(FILES_DIR, exist_ok=True)

TEMP_PDF = os.path.join(FILES_DIR, "order.pdf")
TEMP_DXF = os.path.join(FILES_DIR, "order.dxf")
TEMP_ZIP = os.path.join(FILES_DIR, "order.zip")

@app.route("/generate/files", methods=["POST"])
def generate_files():
    data = request.get_json()

    # Generăm PDF
    generate_pdf(data, TEMP_PDF)

    # Generăm DXF în funcție de categorie + tip
    generate_dxf(data, TEMP_DXF)

    # Creăm ZIP
    create_zip([TEMP_PDF, TEMP_DXF], TEMP_ZIP)

    return send_file(TEMP_ZIP, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)