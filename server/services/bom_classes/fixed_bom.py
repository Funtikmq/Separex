from .base_bom import BillOfMaterials

class FixedWallsBOM(BillOfMaterials):
    def build_bom(self):

        # Constante: latime profil
        profile_width = 22

        # Numărul de sectiuni
        section_types = self.data.get("sectionType", [])
        section_count = len(section_types)

        # Înalțimea gol
        gap_height = self.data.get("dimensions", {}).get("height", 0)
        # Înalțimea construcție
        frame_height = gap_height -10
        section_height = frame_height

        # Lățimea gol
        gap_width = self.data.get("dimensions", {}).get("width", 0)
        # Latimea constructie
        frame_width = gap_width - 10
        # Latimee sectiuni
        sections_width = self.data.get("sectionDimensions", [0])

        #Profile B
        profile_b_amount = section_count * 2
        profile_b_length_per_piece = section_height
        profile_b_total = profile_b_length_per_piece * profile_b_amount
        #Profile H
        profile_h_amount = section_count * 2
        profile_h_length_per_piece = [width - 44 for width in sections_width]
        profile_h_total = sum(profile_h_length_per_piece) * 2

        #Profile O
        # Numărul de profile O în funcție de model
        models_line_amount = {
            'Aero': (0, 0),
            'Line': (1, 0),
            'Double Line': (2, 0),
            'Triple Line': (3, 0),
            'Simetry': (0, 1),
            'Trio': (0, 2),
            'Quatro': (0, 3),
            'Five': (0, 4),
            'Trend': (0, 2),
            'Nordic': (1, 1),
            'Punto': (1, 2),
            'Geos': (1, 1),
            'Geometry': (1, 2),
            'Star': (1, 3),
            'Diez': (1, 4),
            'Loft': (2, 2),
            'Nimbus': (2, 2),
            'Modern': (0.55, 0.8),
            'Modern Inverted': (0.55, 0.8),
            'Altus': (0.9, 2)
        }

        door_models = self.data.get("sectionModels", [])

        # Inițializăm lungimile totale
        profile_o_vertical_total_length = 0
        profile_o_horizontal_total_length = 0

        # Calculăm pentru fiecare secțiune individual
        for i, model in enumerate(door_models):
            if i < len(sections_width):
                v_lines, h_lines = models_line_amount.get(model, (0, 0))

                # Profile O verticale pentru această secțiune
                # Lungimea unei profile O verticale = înălțimea secțiunii - (2 * lățime profil)
                vertical_length_per_piece = section_height - (2 * profile_width)
                profile_o_vertical_total_length += v_lines * vertical_length_per_piece

                # Lungimea unui profil O orizontal = lățimea secțiunii - (2 * lățime profil)
                section_width = sections_width[i]
                horizontal_length_per_piece = section_width - (2 * profile_width)
                profile_o_horizontal_total_length += h_lines * horizontal_length_per_piece

        # Înmulțim cu 2 pentru ambele părți
        profile_o_vertical_total_length *= 2
        profile_o_horizontal_total_length *= 2

        # Lungimea totală a profilelor O
        profile_o_total_length = profile_o_vertical_total_length + profile_o_horizontal_total_length

        #Sticla
        glass_height = section_height - 2 * profile_width + 15
        glass_width = [length + 15 for length in profile_h_length_per_piece]

        print("Numărul de secțiuni", section_count)
        print("Înălțime gol", gap_height)
        print("Înălțime construcție", frame_height)
        print("Înălțime secțiune", section_height)
        print("Lățime gol", gap_width)
        print("Lățime construcție", frame_width)
        print("Lățime secțiuni", sections_width)
        print("Număr profile B", profile_b_amount)
        print("Lungime profile B pe bucată", profile_b_length_per_piece)
        print("Lungime profile B total", profile_b_total)
        print("Număr profile H", profile_h_amount)
        print("Lungime profile H pe bucată", profile_h_length_per_piece)
        print("Lungime profile H total", profile_h_total)
        print("Lungime profile O orizontal", profile_o_horizontal_total_length)
        print("Lungime profil O vertical", profile_o_vertical_total_length)
        print("Lungime sticla", glass_height)
        print("Largime sticla",glass_width)


        return [
            {"item": "DoorFrame", "qty": 4},
            {"item": "GlassPanel", "qty": 1},
        ]