from reportlab.lib.units import cm

from ..common import draw_box
from reportlab.platypus import Paragraph
from reportlab.lib.styles import getSampleStyleSheet


def draw_right_boxes(c, right_x, table_y, right_width, image_path):
    top_box_width = (right_width - 0.5 * cm) / 2

    # Boxul din stânga (pentru imagine)
    image_box_x = right_x
    draw_box(c, image_box_x, table_y, top_box_width, 4.5 * cm)

    try:
        c.drawImage(image_path,
                    image_box_x,
                    table_y - 4.5 * cm,
                    width=top_box_width,
                    height=4.5 * cm,
                    preserveAspectRatio=False,
                    mask='auto',
                    anchor='sw')
    except:
        c.drawString(image_box_x + 0.5 * cm, table_y - 2 * cm, "Imagine indisponibilă")
    # Boxul din dreapta (pentru text)
    text_box_x = right_x + top_box_width + 0.5 * cm
    draw_box(c, text_box_x, table_y, top_box_width, 4.5 * cm)

    # Adaugă textul în al doilea box
    styles = getSampleStyleSheet()

    # Stil pentru titlu (bold)
    title_style = styles["Normal"]
    title_style.fontName = "Helvetica-Bold"
    title_style.fontSize = 10
    title_style.leading = 12
    title_style.textColor = "black"

    # Stil pentru text normal
    normal_style = styles["Normal"]
    normal_style.fontName = "Helvetica"
    normal_style.fontSize = 7
    normal_style.leading = 10
    normal_style.textColor = "black"

    text = """
    <b>FERONERIE SI MECANISME ITALIENE FIABILE</b>
    Toate Produsele sunt echipate cu 100% mecanisme italiene extrem de fiabile.
    In urma testelor tehnice efectuate in laboratorul Catas in Italia, 
    mecanismele si sistemele de deschidere au prezentat rezultate excelente: 
    100.000 de cicluri de deschidere/inchidere fara probleme tehnice.
    Sistemele de glisare sunt echipate cu mecanisme soft-close
    """

    # Calculează dimensiunile pentru text
    text_width = top_box_width - 0.4 * cm
    text_height = 4.5 * cm - 0.4 * cm

    # Desenează textul
    p = Paragraph(text, normal_style)
    p.wrapOn(c, text_width, text_height)
    p.drawOn(c,
             text_box_x + 0.2 * cm,
             table_y - 4.5 * cm + 0.2 * cm)