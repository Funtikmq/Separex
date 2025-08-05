from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor
import os

PAGE_SIZE = A4
MARGIN = 1 * cm
LOGO_PATH = os.path.join("static", "logo.png")

CONTACT_INFO = {
    "company": "SEPAREX SRL",
    "web": "www.separex.ro",
    "email": "cociug@separex.ro",
    "address": "Harmanului 53, Brasov, Romania",
    "CIF": "48294202",
    "IBAN": "RO03BTRLRONCRT0CM9027201"
}

COLORS = {
    "primary": HexColor("#f4a621"),
    "text": HexColor("#000000"),
    "secondary_text": HexColor("#777777"),
    "light_gray": HexColor("#f5f5f5")
}