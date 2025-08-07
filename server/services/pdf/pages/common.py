from reportlab.lib.units import cm
from ..constants import COLORS


def draw_box(c, x, y, width, height, label="",font_size=9,font_name="Helvetica"):
    c.setStrokeColor(COLORS["primary"])
    c.rect(x, y - height, width, height)
    if label:
        c.setFillColor(COLORS["text"])
        c.setFont(font_name, font_size)
        c.drawCentredString(x + width / 2, y - height / 2 - 4, label)


def draw_table(c, x, y, data, col_widths, row_height=0.6 * cm):

    from reportlab.lib import colors

    table_width = sum(col_widths)
    table_height = len(data) * row_height

    label_bg = colors.HexColor("#999999")
    value_bg = colors.HexColor("#DDDDDD")

    c.setStrokeColor(colors.black)
    c.setLineWidth(0.3)

    c.setFont("Helvetica", 10)

    for i, (label, value) in enumerate(data):
        top_y = y - i * row_height

        # Background label cell
        c.setFillColor(label_bg)
        c.rect(x, top_y - row_height, col_widths[0], row_height, stroke=0, fill=1)

        # Background value cell
        c.setFillColor(value_bg)
        c.rect(x + col_widths[0], top_y - row_height, col_widths[1], row_height, stroke=0, fill=1)

        # Borders
        c.setFillColor(colors.black)
        c.line(x, top_y, x + table_width, top_y)  # top line

        # Text label
        c.setFillColor(colors.black)
        c.drawString(x + 2, top_y - row_height + 4, str(label))

        # Text value
        c.drawString(x + col_widths[0] + 2, top_y - row_height + 4, str(value))

    # Bottom line
    c.line(x, y - len(data) * row_height, x + table_width, y - len(data) * row_height)

    # Vertical lines
    c.line(x, y, x, y - table_height)
    c.line(x + col_widths[0], y, x + col_widths[0], y - table_height)
    c.line(x + table_width, y, x + table_width, y - table_height)