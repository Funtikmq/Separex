from reportlab.lib.units import cm
from reportlab.platypus import Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from .right_boxes import draw_right_boxes
from ..common import draw_box, draw_table
from ...constants import PAGE_SIZE, MARGIN


def draw_bottom_section(c, start_y, data):
    page_width, _ = PAGE_SIZE

    box_width = 4 * cm
    box_height = 4 * cm
    half_box_height = box_height / 2
    gap = 1 * cm

    glass_color = data.get("colors", ["default"])[0]

    box_contents = [
        {
            "type": "text",
            "content": f"""
            <b>Profil <br/> Aluminiu Anodizat</b> <br/>
            Negru<br/>
            <b>Sticla </b> {glass_color} <br/>
            """
        },
        {"type": "image", "path": f"static/glass/{glass_color.lower()}.jpeg"},
        {
            "type": "text",
            "content": """
            <b>Profile SLIM pentru o constructie eleganta dar rezistenta</b><br/>
            Partea vizibila de doar 22mm pentru aspect estetic.<br/>
            Adancimea profilului de 44 mm - pentru rezistenta constructiei
            """
        },
        {"type": "image", "path": "static/quality2.png"}
    ]

    for i in range(4):
        x = MARGIN + i * (box_width + gap)

        # Dacă este primul chenar, folosește înălțime redusă
        current_height = half_box_height if i == 0 else box_height
        y_position = start_y if i == 0 else start_y  # păstrăm start_y același

        draw_box(c, x, y_position, box_width, current_height)

        box_content = box_contents[i]

        if box_content["type"] == "text":
            style = getSampleStyleSheet()["Normal"]
            style.fontName = "Helvetica"
            style.fontSize = 10
            style.leading = 12

            p = Paragraph(box_content["content"], style)
            p.wrapOn(c, box_width - 0.4 * cm, current_height)
            p.drawOn(c, x + 0.2 * cm, y_position - current_height + 0.2 * cm)

        elif box_content["type"] == "image":
            try:
                c.drawImage(
                    box_content["path"],
                    x,
                    y_position - current_height - 0.05 * cm,
                    width=4.1 * cm,
                    height=4.1 * cm,
                    preserveAspectRatio=False,
                    mask='auto',
                    anchor='sw'
                )
            except:
                c.drawString(x + 0.5 * cm, y_position - current_height / 2, "Imagine indisponibilă")




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
    price = data.get("price",["-"])
    table_data.append(("Pret", price))

    dimensions = data.get("dimensions")
    if dimensions and dimensions.get("width") <= 1000:
        top_gap = 1 * cm
    else:
        top_gap = 1.5 * cm

    table_y = start_y - box_height - top_gap
    draw_table(c, MARGIN, table_y, table_data, [4 * cm, 4 * cm])

    # Desenează restul boxurilor din dreapta
    right_x = MARGIN + 8 * cm + 1 * cm
    right_width = page_width - MARGIN - right_x
    top_box_width = (right_width - 0.5 * cm) / 2

    draw_right_boxes(c, right_x, table_y, right_width, "static/quality1.png")

    draw_box(c, right_x, table_y - 4.5 * cm - 0.5 * cm, right_width, 1.125 * cm,
             "* Transport Inclus. Montajul se achita separat", 12, "Helvetica-Bold")
