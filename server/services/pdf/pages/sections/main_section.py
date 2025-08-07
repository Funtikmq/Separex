from reportlab.lib.units import cm
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph
from reportlab.lib.styles import getSampleStyleSheet
import base64, io
from PIL import Image
from ..common import draw_box
from ...constants import PAGE_SIZE


def draw_main_content_section(c, start_y, title_y, data, MARGIN):
    page_width, _ = PAGE_SIZE

    # Inițializare stiluri
    styles = getSampleStyleSheet()
    style = styles["Normal"]
    style.fontName = "Helvetica"
    style.fontSize = 10
    style.leading = 12
    style.textColor = "black"

    image_height_drawn = 0
    y_position = start_y  # fallback dacă nu există imagine

    if data.get('image'):
        try:
            base64_data = data['image'].split(',')[1]
            image_bytes = base64.b64decode(base64_data)
            pil_image = Image.open(io.BytesIO(image_bytes))
            orig_width, orig_height = pil_image.size

            # Crop
            crop_margin_x = 0
            crop_margin_y = 0
            dimensions = data.get("dimensions")
            if dimensions and dimensions.get("width", 0) <= 1000:
                crop_margin_x = int(orig_width * 0.35)
                target_width = 8.5 * cm
            elif dimensions and dimensions.get("width", 0) >= 3000:
                crop_margin_x = int(orig_width * 0.22)
                if dimensions and dimensions.get("height", 0) <= 3000:
                    crop_margin_y = int(orig_height * 0.2)
                else:
                    crop_margin_y = 0
                target_width = 13.5 * cm
            else:
                crop_margin_x = int(orig_width * 0.28)
                target_width = 11.5 * cm

            cropped = pil_image.crop((
                crop_margin_x,
                crop_margin_y,
                orig_width - crop_margin_x,
                orig_height
            ))

            # Conversie pentru PDF
            img_byte_arr = io.BytesIO()
            cropped.save(img_byte_arr, format='PNG')
            img_byte_arr.seek(0)
            image = ImageReader(img_byte_arr)

            # Dimensiuni
            cropped_width, cropped_height = cropped.size
            aspect_ratio = cropped_height / cropped_width
            real_height = target_width * aspect_ratio

            # Poziționare
            x_position = MARGIN
            y_position = title_y - real_height - 1 * cm
            image_height_drawn = real_height + 1 * cm

            c.drawImage(
                image,
                x_position,
                y_position,
                width=target_width,
                height=real_height,
                preserveAspectRatio=True,
                mask='auto'
            )

            # === 2. Chenare Dreapta (alături de imagine) ===
            box_width = 4 * cm
            box_height = 4 * cm
            gap = 2 * cm

            y = y_position + real_height - box_height
            right_start_x = x_position + target_width + gap

            color = data.get("colors", ["-"])
            glass_color = "transparenta" if (color[0] == "Clear") else color[0].lower()

            boxes = [
                (
                    """
                    <b>SCHEMA DESCHIDERE</b><br/>
                    2 sectiuni active<br/>
                    Glisare fluida si usoara datorita sistemului de glisare si mecanismului soft-close italian
                    """,
                    box_height
                ),
                (
                    "<b>SCHEMA</b><br/>",
                    box_height
                ),
            ]

            for label, height in boxes:
                draw_box(c, right_start_x, start_y, box_width, height)
                p = Paragraph(label, style)
                p.wrapOn(c, box_width - 0.4 * cm, height - 0.4 * cm)
                p.drawOn(c, right_start_x + 0.2 * cm, y + height - p.height - 0.2 * cm)
                y -= height + gap

        except Exception as e:
            print(f"[EROARE] {str(e)}")
            c.setFont("Helvetica", 10)
            c.drawString(MARGIN, title_y - 2 * cm, f"Eroare imagine: {str(e)}")

    return y_position