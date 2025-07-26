import ezdxf
from services.drawings.swing_door import swing_door
from services.drawings.fixed_wall import fixed_wall
from services.drawings.sliding_door import sliding_door

def generate_dxf(data, filepath):
    doc = ezdxf.new()
    msp = doc.modelspace()

    category = data.get("category")
    type_ = data.get("type")

    # Alegem funcția corectă în funcție de categorie + tip
    if category == "Swing Doors":
        swing_door(msp, data)
    elif category == "Sliding Doors":
        sliding_door(msp, data)
    else:
        # fallback generic
        fixed_wall(msp, data)

    doc.saveas(filepath)

def draw_generic(msp, data):
    # fallback simplu (de ex. doar un dreptunghi)
    width = float(data.get("dimensions", {}).get("width", 100))
    height = float(data.get("dimensions", {}).get("height", 50))
    msp.add_lwpolyline([(0, 0), (width, 0), (width, height), (0, height), (0, 0)], close=True)