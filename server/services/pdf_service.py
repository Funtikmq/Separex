from reportlab.pdfgen import canvas

def generate_pdf(data, filepath):
    c = canvas.Canvas(filepath)
    y = 750
    line_height = 20

    for label, value in data.items():
        c.drawString(100, y, f"{label}: {str(value)}")
        y -= line_height

    c.save()