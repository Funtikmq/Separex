from reportlab.pdfgen import canvas
from .constants import PAGE_SIZE
from .pages import first_page, second_page, third_page, fourth_page


def generate_pdf(data, filepath):
    c = canvas.Canvas(filepath, pagesize=PAGE_SIZE)

    # Generate each page
    first_page.draw_first_page(c, data)
    c.showPage()

    second_page.draw_second_page(c)
    c.showPage()

    third_page.draw_third_page(c)
    c.showPage()

    fourth_page.draw_fourth_page(c)

    c.save()