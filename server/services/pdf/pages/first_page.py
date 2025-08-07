from reportlab.lib.units import cm

from .sections.main_section import draw_main_content_section
from .sections.bottom_section import draw_bottom_section
from ..utils import draw_logo, draw_contact_info, draw_title
from ..constants import PAGE_SIZE, MARGIN


def draw_first_page(c, data):
    page_width, page_height = PAGE_SIZE

    draw_logo(c, MARGIN, page_height - MARGIN - 3 * cm)
    draw_contact_info(c, page_width - MARGIN, page_height - MARGIN)

    title_text = f"{data.get('category', 'No Category')} - {data.get('type', 'No Type')}"
    title_y = page_height - MARGIN - 4 * cm
    draw_title(c, page_width / 2, title_y, title_text)

    image_bottom_y = draw_main_content_section(
        c, page_height - MARGIN - 5 * cm, title_y, data, MARGIN, )

    draw_bottom_section(
        c, image_bottom_y - 1 * cm, data,)

