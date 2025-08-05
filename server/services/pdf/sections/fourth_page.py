from .third_page import _draw_promo_image
from ..constants import MARGIN, PAGE_SIZE


def draw_fourth_page(c ):
    page_width, page_height = PAGE_SIZE

    # Promo area dimensions
    promo_area_width = page_width - 2 * MARGIN
    promo_area_height = page_height - 2 * MARGIN
    promo_height = promo_area_height / 2

    # Top promo
    _draw_promo_image(c, "static/promo3.png",
                      MARGIN, MARGIN + promo_height,
                      promo_area_width, promo_height)

    # Bottom promo
    _draw_promo_image(c, "static/promo4.png",
                      MARGIN, MARGIN,
                      promo_area_width, promo_height)