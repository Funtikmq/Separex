import re

from .base_bom import BillOfMaterials

class SlidingDoorsBOM(BillOfMaterials):
    def build_bom(self):

        # Numărul de secțiuni
        if 'type' in self.data:
            match = re.search(r'^(\d+)-Part Element$', self.data['type'])
            if match:
                section_count = int(match.group(1))

        #Înalțimea gol
        gap_height = self.data.get("dimensions",{}).get("height",0)
        # Înalțimea secțiunilor
        if (self.data.get("mountType") == "On wall"):
            section_height = gap_height + 32 + 57
        elif (self.data.get("mountType") == "In wall"):
            section_height = gap_height -79

        #Lățimea gol
        gap_width = self.data.get("dimensions",{}).get("width",0)

        # Numărul profile vizibile
        if section_count == 1:
            visibile_profiles = 2
        elif section_count == 2:
            visibile_profiles = 3
        elif section_count == 3:
            visibile_profiles = 4
        elif section_count == 4:
            visibile_profiles = 6

        #Lungime Profil H pentru o secțiune

        profile_h_lenght = (gap_width - 44)/section_count

        print("data", self.data)
        print("Număr părți:", section_count)
        print("Profile vizibile:",visibile_profiles)
        print("Lațime totală:", gap_width)
        print("Înălțime totală:", gap_height)
        print("Înălțime secțiune:", section_height)
        print("Lungime profil H:", profile_h_lenght)

        return [
            {"item": "Sticla","qty":1 ,"width": 900,"height":section_height},
            {"item": "Profil B", "qty": 2},
            {"item": "Profil H", "qty": 2},
            {"item": "Profil O", "qty": 2},
            {"item": "Sina", "qty": 1},
            {"item": "MecanismSimplu", "qty": 2},
            {"item": "MecanismABS", "qty": 2},
            {"item": "PlatBanda", "qty": 2},
            {"item": "BandaDubluadeziva", "qty": 2},
            {"item": "Suruburi", "qty": 2},
            {"item": "MascaSina", "qty": 2},


        ]