from reportlab.lib import colors
from reportlab.lib.units import cm
from ..constants import COLORS, MARGIN, PAGE_SIZE


def draw_second_page(c):
    page_width, page_height = PAGE_SIZE

    # 1. Big title (centered)
    y = page_height - MARGIN - 2 * cm
    c.setFont("Helvetica-Bold", 16)
    c.setFillColor(COLORS["text"])

    title_lines = [
        "PERETII GLISANTI SEPAREX AU DOAR STICLA SECURIZATA",
    ]

    for line in title_lines:
        text_width = c.stringWidth(line, "Helvetica-Bold", 16)
        c.drawString((page_width - text_width) / 2, y, line)
        y -= 20  # spacing

    # 2. Glass description text (positioned higher)
    y_glass_desc = y - 0.5 * cm  # Higher position for description
    _draw_glass_description(c, y_glass_desc)

    # 3. Glass images with text (positioned lower)
    y_glass_images = y_glass_desc - 5 * cm
    _draw_glass_images_section(c, y_glass_images)

    # 4. Aluminum section with text box and image
    y_alum = y_glass_images - 8 * cm
    _draw_aluminum_section(c, y_alum)

    # 5. Construction section
    _draw_construction_section(c)


def _draw_glass_description(c, y):
    page_width, _ = PAGE_SIZE

    c.setFont("Helvetica", 10)
    glass_desc = (
        "Sticla securizata imbina aspectul luminos si elegant al sticlei obisnuite cu siguranta pe care o ofera "
        "materialele dure si rezistente. Ea se obtine printr-o serie de prelucrari termice si chimice speciale care "
        "sporeste cel putin de cinci ori durabilitatea la lovituri si variatii de temperatura. Sticla securizata se "
        "foloseste in cazurile in care securitatea si siguranta in exploatare se afla pe primul loc si datorita faptului "
        "ca aceasta se sparge in bucati mici si netaioase, astfel limitand riscul de aparitie al accidentelor."
    )

    # Draw wrapped text
    text_object = c.beginText(MARGIN, y)
    text_object.setFont("Helvetica", 10)
    text_object.setFillColor(COLORS["text"])
    for line in _wrap_text(glass_desc, "Helvetica", 10, page_width - 2 * MARGIN):
        text_object.textLine(line)
    c.drawText(text_object)


def _draw_glass_images_section(c, y):
    page_width, _ = PAGE_SIZE
    col_img_width = 5 * cm
    col_img_height = 7 * cm
    col_text_width = (page_width - 2 * MARGIN - 2 * col_img_width - 2 * cm) / 4

    # Adjust image position higher (reduce y offset)
    image_y_offset = 3 * cm

    # Column 1 - Secured glass
    img1_path = "static/glass1.png"
    text1 = [
        "STICLA SECURIZATA",
        "- De 5 ori mai rezistenta",
        "- Se sparge in cioburi mici care nu ranesc"
    ]
    _draw_glass_column(c, MARGIN, y + image_y_offset, img1_path, text1, col_img_width, col_img_height)

    # Column 2 - Unsecured glass
    img2_path = "static/glass2.png"
    text2 = [
        "STICLA NESECURIZATA",
        "- Mai fragila",
        "- Periculoasa la spargere"
    ]
    _draw_glass_column(c, MARGIN + col_img_width + col_text_width + 2 * cm, y + image_y_offset,
                      img2_path, text2, col_img_width, col_img_height)


def _draw_glass_column(c, x_img, y, img_path, text_lines, img_width, img_height):
    import os
    if os.path.exists(img_path):
        c.drawImage(img_path, x_img, y - img_height,
                   width=img_width, height=img_height,
                   preserveAspectRatio=True, mask='auto')

    text_x = x_img + 5 * cm
    text_y = y - img_height + 5 * cm

    for i, line in enumerate(text_lines):
        if i == 0:
            c.setFont("Helvetica-Bold", 10)
        else:
            c.setFont("Helvetica", 9)

        c.drawString(text_x, text_y, line)
        text_y -= 0.6 * cm


def _draw_aluminum_section(c, y):
    page_width, _ = PAGE_SIZE
    box_height = 7 * cm
    col_img_width = 5 * cm
    box_text_width = page_width - 2 * MARGIN - col_img_width - 1 * cm

    y += 2 * cm

    # Titlu
    c.setFont("Helvetica-Bold", 12)
    c.setFillColor(COLORS["text"])
    title = "Peretii din aluminiu Separex - o solutie eleganta si functionala pentru interioare moderne pentru a separa"
    "si zona frumos dar practic o incapere"

    c.drawString(MARGIN, y, title)
    y -= 0.7 * cm

    # === Fundal gri chenar complet ===
    gray_bg_color = colors.HexColor("#f4f4f4")
    c.setFillColor(gray_bg_color)
    c.rect(MARGIN, y - box_height, box_text_width, box_height, stroke=0, fill=1)


    # Text descriptiv
    description = (
        "Profilele din aluminiu cu invelis special catifelat fac constructia usoara si eleganta dar deosebit de "
        "rezistenta cu un termen foarte lung de exploatare. Peretii din aluminiu si sticla integreaza calitatea si "
        "design-ul intr-o singura solutie. Sunt extrem de eleganti, usor de intretinut si prezinta o durabilitate exceptionala."
    )

    # Setari generale
    line_height = 0.5 * cm
    text_x = MARGIN + 0.5 * cm
    current_y = y - 0.5 * cm
    font_size = 9

    # Text normal
    c.setFont("Helvetica", font_size)
    c.setFillColor(COLORS["text"])
    for line in _wrap_text(description, "Helvetica", font_size, box_text_width - 1 * cm):
        c.drawString(text_x, current_y, line)
        current_y -= line_height

    # Titlu bullets
    bullet_intro = "Avantajele partitiilor din aluminiu Separex:"
    c.setFont("Helvetica", font_size)
    c.drawString(text_x, current_y, bullet_intro)
    current_y -= line_height * 1.2

    # Lista bullets
    bullets = [
        "Profilele SLIM din aluminiu cu muchii perfect drepte si imbinte fara sudur",
        "Design, feronerie si sisteme de glisare fiable italiene",
        "Rezistente la uzur si umiditate",
        "Sticla securizata",
        "Usor de intretinut",
        "Realizarea oricaror marimi cu precizie de 1 mm"
    ]

    c.setFont("Helvetica-Bold", font_size)
    for bullet in bullets:
        bullet_lines = _wrap_text("- " + bullet, "Helvetica-Bold", font_size, box_text_width - 1 * cm)
        for line in bullet_lines:
            c.drawString(text_x, current_y, line)
            current_y -= line_height
        current_y -= 0.1 * cm  # spatiu intre bullets

    # Imagine
    img_path = "static/profile.png"
    img_x = MARGIN + box_text_width + 1 * cm
    import os
    if os.path.exists(img_path):
        c.drawImage(img_path, img_x, y - box_height,
                    width=col_img_width, height=box_height,
                    preserveAspectRatio=True, mask='auto')



def _draw_construction_section(c):
    page_width, page_height = PAGE_SIZE
    img_path = "static/profileBig.png"
    img_height = 6 * cm

    # Full width image
    import os
    if os.path.exists(img_path):
        c.drawImage(img_path, -6 * cm, 0,
                    width=page_width * 2, height=img_height,
                    preserveAspectRatio=True, mask='auto')


def _wrap_text(text, font_name, font_size, max_width):
    """Helper function to wrap text to specified width"""
    from reportlab.pdfbase.pdfmetrics import stringWidth
    words = text.split()
    lines = []
    current_line = []

    for word in words:
        test_line = ' '.join(current_line + [word])
        if stringWidth(test_line, font_name, font_size) <= max_width:
            current_line.append(word)
        else:
            lines.append(' '.join(current_line))
            current_line = [word]

    if current_line:
        lines.append(' '.join(current_line))

    return lines