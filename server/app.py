from flask import Flask, request, send_file, render_template, after_this_request
import ezdxf
import tempfile
import os
from reportlab.pdfgen import canvas
from zipfile import ZipFile
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/')
def index():
    return {'status':'Backend functional'}

@app.route('/api/genereaza', methods=['POST'])
def genereaza_dxf_si_pdf():
    latime = float(request.json['latime'])
    inaltime = float(request.json['inaltime'])
    grosime_rama = 22

    # Creează fișiere temporare
    tmp_dir = tempfile.mkdtemp()
    dxf_path = os.path.join(tmp_dir, "usa_profil.dxf")
    pdf_path = os.path.join(tmp_dir, "descriere.pdf")
    zip_path = os.path.join(tmp_dir, "output.zip")

    # ====== 1. Generează DXF ======
    doc = ezdxf.new(dxfversion="R2010")
    msp = doc.modelspace()

    # ===== Contur Exterior =====
    msp.add_lwpolyline([
        (200, 200),
        (200 + latime, 200),
        (200 + latime, 200 + inaltime),
        (200, 200 + inaltime),
        (200, 200)
    ], close=True)
    # ===== Contur Interior =====
    msp.add_lwpolyline([
        (200 + grosime_rama, 200 + grosime_rama),
        (200 + latime - grosime_rama, 200 + grosime_rama),
        (200 + latime - grosime_rama, 200 + inaltime - grosime_rama),
        (200 + grosime_rama, 200 + inaltime - grosime_rama),
        (200 + grosime_rama, 200 + grosime_rama),
    ], close=True)
    # ====== Profil superior asamblat =====
    msp.add_lwpolyline([
        (200,200 + inaltime),
        (200 + latime*2,200 + inaltime ),
        (200 + latime*2,inaltime + 250),
        (200,inaltime + 250),
        (200,200 + inaltime),
    ])
    # ===== Profil superior =====
    msp.add_lwpolyline([
        (1900, 200),
        (1900 + 50, 200),
        (1900 + 50, 200 + (latime*2)),
        (1900, 200 + (latime*2)),
        (1900, 200)
    ], close=True)
    # ===== Profil orizontal =====
    msp.add_lwpolyline([
        (1500,200),
        (1500+grosime_rama,200),
        (1500+grosime_rama,200 + latime),
        (1500,200 + latime),
        (1500,200)
    ],close=True)
   # ===== Profil vertical =====
    msp.add_lwpolyline([
        (1700, 200),
        (1700 + grosime_rama, 200),
        (1700 + grosime_rama, 200 + inaltime),
        (1700, 200 + inaltime),
        (1700, 200)
    ], close=True)
    # ===== Sticla =====
    msp.add_lwpolyline([
        (2500 + grosime_rama, 200 + grosime_rama),
        (2500 + latime - grosime_rama, 200 + grosime_rama),
        (2500 + latime - grosime_rama, 200 + inaltime - grosime_rama),
        (2500 + grosime_rama, 200 + inaltime - grosime_rama),
        (2500 + grosime_rama, 200 + grosime_rama)
    ], close=True)

    doc.saveas(dxf_path)

    # ======  Generează PDF ======
    c = canvas.Canvas(pdf_path)
    c.setFont("Helvetica", 14)
    c.drawString(100, 800, f"Profil generat cu dimensiuni:")
    c.drawString(100, 780, f"Latime: {latime} mm")
    c.drawString(100, 760, f"Inaltime: {inaltime} mm")
    c.save()

    # ======  Creează ZIP ======
    with ZipFile(zip_path, 'w') as zipf:
        zipf.write(dxf_path, arcname="usa_profil.dxf")
        zipf.write(pdf_path, arcname="descriere.pdf")

    # ======  Curăță fișierele după trimitere ======
    @after_this_request
    def cleanup(response):
        try:
            os.remove(dxf_path)
            os.remove(pdf_path)
            os.remove(zip_path)
            os.rmdir(tmp_dir)
        except Exception as e:
            app.logger.error(f"Eroare la curățare: {e}")
        return response

    # ====== 5. Trimite ZIP către utilizator ======
    return send_file(
        zip_path,
        as_attachment=True,
        download_name="profil_complet.zip",
        mimetype="application/zip"
    )

if __name__ == '__main__':
    app.run(debug=True)
