from flask import Flask, send_file, request
from flask_cors import CORS
import os
from services.pdf_service import generate_pdf
from services.dxf_service import generate_dxf
from services.user_service import save_user_to_firestore
from utils.file_utils import create_zip

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
FILES_DIR = os.path.join(BASE_DIR, "files")
os.makedirs(FILES_DIR, exist_ok=True)

TEMP_PDF = os.path.join(FILES_DIR, "order.pdf")
TEMP_DXF = os.path.join(FILES_DIR, "order.dxf")
TEMP_ZIP = os.path.join(FILES_DIR, "order.zip")

@app.route("/generate/pdf", methods=["POST"])
def generate_pdf_file():
    data = request.get_json()
    os.makedirs(FILES_DIR, exist_ok=True)
    TEMP_PDF = os.path.join(FILES_DIR, "order.pdf")
    generate_pdf(data, TEMP_PDF)
    return send_file(TEMP_PDF, as_attachment=True)


@app.route("/generate/dxf", methods=["POST"])
def generate_dxf_file():
    data = request.get_json()
    if not data:
        return {"error": "No data provided"}, 400

    generate_dxf(data, TEMP_DXF)
    return send_file(TEMP_DXF, as_attachment=True, download_name="order.dxf")
@app.route('/api/save-user', methods=["POST"])
def save_user():
    data = request.get_json()
    if not data:
        return {"error": "No data provided"}, 400

    save_user_to_firestore(data)
    return {"message" : "User saved successfully"}, 200

if __name__ == "__main__":
    app.run(debug=True)