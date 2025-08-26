from .base_bom import BillOfMaterials

class FixedWallsBOM(BillOfMaterials):
    def build_bom(self):
        return [
            {"item": "DoorFrame", "qty": 4},
            {"item": "GlassPanel", "qty": 1},
        ]