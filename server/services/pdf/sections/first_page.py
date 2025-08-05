from reportlab.lib.units import cm
from .common import draw_box, draw_table
from ..constants import  MARGIN, PAGE_SIZE
from ..utils import draw_logo, draw_contact_info, draw_title
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph


def draw_first_page(c, data):
    page_width, page_height = PAGE_SIZE

    # 1. Logo and Contact Info
    draw_logo(c, MARGIN, page_height - MARGIN - 3 * cm)
    draw_contact_info(c, page_width - MARGIN, page_height - MARGIN)

    # 2. Title
    title_text = f"{data.get('category', 'No Category')} - {data.get('type', 'No Type')}"
    draw_title(c, page_width / 2, page_height - MARGIN - 4 * cm, title_text)

    # 3. Main content sections
    _draw_main_content_section(c, page_height - MARGIN - 5 * cm,data)
    _draw_bottom_section(c, page_height - MARGIN - 17 * cm, data)


def _draw_main_content_section(c, start_y, data):
    page_width, _ = PAGE_SIZE

    # Inițializare stiluri
    styles = getSampleStyleSheet()
    style = styles["Normal"]
    style.fontName = "Helvetica"
    style.fontSize = 10
    style.leading = 12
    style.textColor = "black"

    # Left image
    draw_box(c, MARGIN, start_y, 8 * cm, 11 * cm, "Imagine produs")

    # Right 2x3 boxes
    right_start_x = MARGIN + 8 * cm + 2 * cm
    box_width = 4 * cm
    box_height = 4 * cm
    gap = 0.5 * cm

    color = data.get("colors", ["-"])
    glass_color = "transparenta" if (color[0] == "Clear") else color[0].lower()

    box1_text = """
    <b>SCHEMA DESCHIDERE</b><br/>
    <b>2 sectiuni active</b><br/>
    Glisare fluida si usoara<br/>
    datorita sistemului de<br/>
    glisare si mecanismului<br/>
    soft-close italian
    """

    boxes = [
        (box1_text, box_height),
        ("Imagine 2", box_height),
        ("Imagine 3", box_height),
        ("Imagine 4", box_height),
        ("<b>Profil Anodizat Negru </b>",box_height/5),
        (f"<b>Sticla</b> {glass_color}", box_height/5),
    ]

    for index, (label, height) in enumerate(boxes):
        row = index // 2
        col = index % 2

        height_current = height

        y = start_y
        for r in range(row):
            above_index = r * 2
            _, h = boxes[above_index]
            y -= h + gap

        x = right_start_x + col * (box_width + gap)

        draw_box(c, x, y, box_width, height_current)

        if "<b>" in str(label):
            p = Paragraph(label, style)
            p.wrapOn(c, box_width - 0.4 * cm, height_current - 0.4 * cm)
            p.drawOn(c, x + 0.2 * cm, y - height_current + 0.2 * cm)
        elif "Imagine" not in label:
            c.setFont("Helvetica", 10)
            c.drawString(x + 0.2 * cm, y - height_current + 0.5 * cm, label)

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


def _draw_bottom_section(c, start_y, data):
    page_width, _ = PAGE_SIZE

    box_width = 4 * cm
    box_height = 4 * cm
    gap = 1 * cm

    # Conținutul pentru fiecare chenar
    box_contents = [
        {"type": "text","content":"text"},
        {"type": "image", "path": "static/quality2.png"},
        {"type": "text", "content": """
        <b>Profile SLIM pentru o constructie eleganta dar rezistenta</b> "
         Partea vizibila de doar 22mm  pentru aspect estetic. 
        Adancimea profilului de 44 mm- pentru rezistenta constructiei
        """},
        {"type": "image", "path": "static/quality2.png"}
    ]

    # Desenează cutiile mici
    for i in range(4):
        x = MARGIN + i * (box_width + gap)
        draw_box(c, x, start_y, box_width, box_height, )

        # Adaugă conținutul în chenar
        box_content = box_contents[i]

        if box_content["type"] == "text":
            # Adaugă text în chenar
            style = getSampleStyleSheet()["Normal"]
            style.fontName = "Helvetica"
            style.fontSize = 10
            style.leading = 12

            p = Paragraph(box_content["content"], style)
            p.wrapOn(c, box_width - 0.4 * cm, box_height)
            p.drawOn(c, x + 0.2 * cm, start_y - box_height + 0.2 * cm)

        elif box_content["type"] == "image":
            # Adaugă imagine în chenar
            try:
                c.drawImage(box_content["path"],
                            x ,
                            start_y - box_height,
                            width=4 *cm,
                            height=4 * cm,
                            preserveAspectRatio=False,
                            mask='auto',
                            anchor='sw')
            except:
                c.drawString(x + 0.5 * cm, start_y - box_height / 2, "Imagine indisponibilă")



    table_data = []

    # Inaltimea gol
    height = data.get("dimensions", {}).get("height", "-")
    table_data.append(("Inaltimea gol (mm)", str(height)))

    # Latimea gol
    width = data.get("dimensions", {}).get("width", "-")
    table_data.append(("Latimea gol (mm)", str(width)))

    # Model (primul din lista models sau '-')
    model = data.get("models", ["-"])
    model_value = model[0] if model else "-"
    table_data.append(("Model", model_value))

    # Culoarea aluminiu (mereu "Negru")
    table_data.append(("Culoarea aluminiu", "Negru"))

    # Sticla (primul din lista colors sau '-')
    colors = data.get("colors", ["-"])
    sticla = colors[0] if colors else "-"
    table_data.append(("Sticla", sticla))

    # Mecanism Glisare (în funcție de type)
    type_val = data.get("type", "")
    mecanism_glisare = f"{type_val} (Italia)" if type_val else "-"
    table_data.append(("Mecanism Glisare", mecanism_glisare))

    # Mecanism Inchidere (în funcție de type)
    mecanism_inchidere = f"{type_val} (Italia)" if type_val else "-"
    table_data.append(("Mecanism Inchidere", mecanism_inchidere))

    # Pret
    table_data.append(("Pret", ""))

    table_y = start_y - box_height - 1 * cm
    draw_table(c, MARGIN, table_y, table_data, [4 * cm, 4 * cm])

    # Desenează restul boxurilor din dreapta
    right_x = MARGIN + 8 * cm + 1 * cm
    right_width = page_width - MARGIN - right_x
    top_box_width = (right_width - 0.5 * cm) / 2

    draw_right_boxes(c, right_x, table_y, right_width, "static/quality1.png")

    draw_box(c, right_x, table_y - 4.5 * cm - 0.5 * cm, right_width, 1.125 * cm,
             "* Transport Inclus. Montajul se achita separat", 12, "Helvetica-Bold")