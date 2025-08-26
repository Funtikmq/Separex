from services.bom_classes.sliding_bom import SlidingDoorsBOM
from services.bom_classes.swing_bom import SwingDoorsBOM
from services.bom_classes.fixed_bom import FixedWallsBOM

def billOfMaterials(order_data):
    category = order_data.get("category", "")
    if category == "Sliding Doors":
        return SlidingDoorsBOM(order_data)
    elif category == "Swing Doors":
        return SwingDoorsBOM(order_data)
    elif category == "Fixed Walls":
        return FixedWallsBOM(order_data)
    else:
        raise ValueError(f"Unknown category: {category}")