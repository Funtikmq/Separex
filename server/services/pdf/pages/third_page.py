from ..constants import MARGIN, PAGE_SIZE


def draw_third_page(c):
    page_width, page_height = PAGE_SIZE

    # Promo area dimensions
    promo_area_width = page_width - 2 * MARGIN
    promo_area_height = page_height - 2 * MARGIN
    promo_height = promo_area_height / 2

    # Top promo
    _draw_promo_image(c, "static/promo1.png",
                      MARGIN, MARGIN + promo_height,
                      promo_area_width, promo_height)

    # Bottom promo
    _draw_promo_image(c, "static/promo2.png",
                      MARGIN, MARGIN,
                      promo_area_width, promo_height)


def _draw_promo_image(c, img_path, x, y, width, height):
    import os
    if os.path.exists(img_path):
        c.drawImage(img_path, x, y,
                    width=width, height=height,
                    preserveAspectRatio=True, mask='auto')