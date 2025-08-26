from abc import ABC, abstractmethod

class BillOfMaterials(ABC):
    def __init__(self, order_data):
        self.data = order_data

    @abstractmethod
    def build_bom(self):

        pass

    def calculate_price(self):
        price_table = {
            "SlidingTrack": 50,
            "DoorFrame": 10,
            "Hinges": 5,
            "GlassPanel": 100,
        }

        bom = self.build_bom()
        total = 0
        for component in bom:
            price_per_unit = price_table.get(component["item"], 0)
            total += price_per_unit * component["qty"]

        quantity = self.data.get("quantity", 1)
        total *= quantity

        return total, bom