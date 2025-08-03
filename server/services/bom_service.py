class billOfMaterials:
    def __init__(self, order_data):
        self.data = order_data

    def build_bom(self):
        bom = []
        if self.data["category"] == "Sliding Doors":
            bom.append({"item": "SlidingTrack", "qty": 1})
        elif self.data["category"] == "Swing Doors":
            bom.append({"item": "DoorFrame", "qty": 3})
            bom.append({"item": "Hinges", "qty": 3})
        else:
            pass
        return bom

    def calculate_price(self):
        price_table = {
            "SlidingTrack": 50,
            "DoorFrame": 10,
            "Hinges": 5,
        }

        bom = self.build_bom()

        total = 0
        for component in bom:
            price_per_unit = price_table.get(component["item"], 0)
            total += price_per_unit * component["qty"]

        quantity = self.data.get("quantity", 1)

        total *= quantity

        return total, bom