from flask import Blueprint, request, send_file
from services.pdf.pdf_service import generate_pdf
from services.dxf_service import generate_dxf
from config import FILES_DIR
import os

docs_bp = Blueprint("pdf", __name__)

TEMP_PDF = os.path.join(FILES_DIR, "order.pdf")
TEMP_DXF = os.path.join(FILES_DIR, "order.dxf")

@docs_bp.route("/pdf", methods=["POST"])
def generate_pdf_file():
    data = request.get_json()
    generate_pdf(data, TEMP_PDF)
    return send_file(TEMP_PDF, as_attachment=True)


@docs_bp.route("/dxf", methods=["POST"])
def generate_dxf_file():
    data = request.get_json()
    if not data:
        return {"error": "No data provided"}, 400
    generate_dxf(data, TEMP_DXF)
    return send_file(TEMP_DXF, as_attachment=True, download_name="order.dxf")