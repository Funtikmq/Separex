from reportlab.platypus import Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import cm
from .constants import LOGO_PATH, CONTACT_INFO, COLORS
from .sections.common import draw_box
import os

def draw_logo(c, x, y, width=5*cm):
    if os.path.exists(LOGO_PATH):
        c.drawImage(LOGO_PATH, x, y, width=width, preserveAspectRatio=True, mask='auto')

def draw_contact_info(c, x, y, font_size=8, spacing=10):
    c.setFont("Helvetica", font_size)
    contact_lines = [
        ("company", CONTACT_INFO["company"]),
        ("web", f"{CONTACT_INFO['web']}"),
        ("email", f"{CONTACT_INFO['email']}"),
        ("text", f"{CONTACT_INFO['address']}"),
        ("text", f"CIF: {CONTACT_INFO['CIF']}"),
        ("text", f"IBAN: {CONTACT_INFO['IBAN']}"),
    ]

    for i, (line_type, text) in enumerate(contact_lines):
        current_y = y - i * spacing

        if line_type == "company":
            c.setFont("Helvetica-Bold", font_size)
            c.setFillColor(COLORS["text"])
        else:
            c.setFont("Helvetica", font_size)
            c.setFillColor(COLORS["secondary_text"])

        c.drawRightString(x, current_y, text)

        if line_type in ["email", "web"]:
            _draw_clickable_link(c, line_type, text, x, current_y, font_size)

def _draw_clickable_link(c, line_type, text, x, y, font_size):
    url = f"mailto:{CONTACT_INFO['email']}" if line_type == "email" else f"http://{CONTACT_INFO['web']}"
    text_width = c.stringWidth(text, c._fontname, font_size)
    x_start = x - text_width
    x_end = x
    y_line = y - 1

    c.linkURL(url, (x_start, y - 2, x_end, y + font_size), relative=0)
    c.setLineWidth(0.5)
    c.setStrokeColor(COLORS["secondary_text"])
    c.line(x_start, y_line, x_end, y_line)

def draw_title(c, x, y, text, font_size=14):
    c.setFont("Helvetica", font_size)
    c.setFillColor(COLORS["text"])
    c.drawCentredString(x, y, text)

def draw_content_box(c, x, y, width, height, content, content_type="text", style=None):


    draw_box(c, x, y, width, height)

    if content_type == "text":
        if not style:
            styles = getSampleStyleSheet()
            style = styles["Normal"]
            style.fontName = "Helvetica"
            style.fontSize = 10
            style.leading = 12

        p = Paragraph(content, style)
        p.wrapOn(c, width - 0.4 * cm, height - 0.4 * cm)
        p.drawOn(c, x + 0.2 * cm, y - height + 0.2 * cm)

    elif content_type == "image":
        try:
            c.drawImage(content,
                        x,
                        y - height,
                        width=width,
                        height=height,
                        preserveAspectRatio=False,
                        mask='auto',
                        anchor='sw')
        except:
            c.drawString(x + 0.5 * cm, y - height / 2, "Imagine indisponibilă")

def get_custom_style(font="Helvetica", size=10, leading=12, bold=False):
    styles = getSampleStyleSheet()
    style = styles["Normal"]
    style.fontName = "Helvetica-Bold" if bold else font
    style.fontSize = size
    style.leading = leading
    style.textColor = "black"
    return style