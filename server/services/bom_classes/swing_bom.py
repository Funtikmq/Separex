from .base_bom import BillOfMaterials

class SwingDoorsBOM(BillOfMaterials):
    def build_bom(self):
        return [
            {"item": "DoorFrame", "qty": 3},
            {"item": "Hinges", "qty": 3},
            {"item": "GlassPanel", "qty": 1},
        ]