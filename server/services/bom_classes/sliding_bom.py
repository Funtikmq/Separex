import re

from .base_bom import BillOfMaterials

class SlidingDoorsBOM(BillOfMaterials):
    def build_bom(self):

        #Constante: inaltime sina, gap, latime profil
        sliding_track_height = 52
        sliding_gap = 5
        profile_width = 22

        # Numărul de sectiuni
        section_types = self.data.get("sectionType", [])
        section_count = len(section_types)
        # Numarul de sectiuni mobile
        mobile_sections = section_types.count("mobile")
        #Numarul de sectiuni fixe
        fixed_sections = section_types.count("fixed")

        #Numărul de șine glisante
        slide_track_amount = 1
        if (self.data.get("mountType") == "On wall"):
            slide_track_amount = 1
        elif (self.data.get("mountType") == "In wall"):
            if(self.data.get("slidingType") == "classic"):
                slide_track_amount = 2
            else:
                slide_track_amount = section_count

        #Înalțimea gol
        gap_height = self.data.get("dimensions",{}).get("height",0)

        if (self.data.get("mountType") == "On wall"):
            # Înalțimea constructie
            frame_height = gap_height + sliding_gap + sliding_track_height - 10
            # Numărul profile vizibile pe perete
            visible_b_profiles = section_count * 2
        elif (self.data.get("mountType") == "In wall"):
            # Înalțimea constructie
            frame_height = gap_height - 10
            # Numărul profile vizibile in perete
            if section_count == 1:
                visible_b_profiles = 2
            elif section_count == 2:
                visible_b_profiles = 3
            elif section_count == 3:
                visible_b_profiles = 4
            elif section_count == 4:
                visible_b_profiles = 6

        # Înalțimea sețiune
        section_height = frame_height - sliding_gap - sliding_track_height

        # Lățimea gol
        gap_width = self.data.get("dimensions", {}).get("width", 0)
        # Latimea constructie
        frame_width = gap_width - 10
        # Latimea sectiune
        section_width = self.data.get("sectionDimensions", [0])[0]


        #Lungime pe sectiune Profil H
        if (self.data.get("mountType") == "On wall"):
            profile_h_length_per_piece= section_width -44
        elif (self.data.get("mountType") == "In wall"):
            profile_h_length_per_piece = (frame_width - visible_b_profiles * profile_width)/section_count
        # Lungime pe sectiune Profil B
        profile_b_length_per_piece = section_height
        #Lungime pe sectiune Profil O
        profile_o_vertical_length = profile_b_length_per_piece - (2 * profile_width)
        profile_o_horizontal_length = profile_h_length_per_piece

        #Lungime totală profile B
        profile_b_total = profile_b_length_per_piece * 2 * section_count
        # Lungime totală profile H
        profile_h_total = profile_h_length_per_piece * 2 * section_count


        #Numărul de profile O în funcție de model
        models_line_amount = {
            'Aero': (0, 0),
            'Line': (1, 0),
            'Double Line': (2, 0),
            'Triple Line': (3, 0),
            'Simetry': (0, 1),
            'Trio': (0,2),
            'Quatro': (0, 3),
            'Five': (0,4),
            'Trend': (0,2),
            'Nordic': (1,1),
            'Punto': (1,2),
            'Geos': (1,1),
            'Geometry': (1, 2),
            'Star': (1, 3),
            'Diez': (1, 4),
            'Loft': (2, 2),
            'Nimbus': (2, 2),
            'Modern':(0.55,0.8),
            'Modern Inverted': (0.55,0.8),
            'Altus': (0.9,2)
        }

        door_models = self.data.get("sectionModels",[])

        profile_o_vertical_count =0
        profile_o_horizontal_count = 0

        for model in door_models:
            v,h = models_line_amount.get(model,(0,0))
            profile_o_vertical_count += v
            profile_o_horizontal_count += h

        profile_o_vertical_count *= 2
        profile_o_horizontal_count *= 2

        #Sticla
        glass_width = profile_h_length_per_piece + 15
        glass_height = section_height - 2*profile_width + 15

        #Detalii
        #Plant Banda
        plat_bande_amout = section_count * 2
        plat_bande_length_per_piece = profile_b_length_per_piece
        #Banda dublu adeziva
        adhesive_bande_length= plat_bande_length_per_piece * plat_bande_length_per_piece
        #Suruburi ********************************De concretizat
        screws = section_count * 4
        # Profil sina
        sliding_track_length = gap_width
        # Profil imbinare sina
        sliding_track_jointing_amount = slide_track_amount -1
        if (sliding_track_jointing_amount > 0):
            sliding_track_jointing_length = sliding_track_length
        else:
            sliding_track_jointing_length = 0
        #Masca Sina
        #Număr Profile șină
        slide_track_mask = sliding_track_length

        #Număr element fixare part fix.

        #Lungime Cheder

        #Număr ghidaj mobil

        # Număr ghidaj fix

        #Număr braț preluare


        print("data", self.data)
        print("Număr secțiuni:", section_count)
        print("Lațime gol:", gap_width)
        print("Înălțime gol:", gap_height)
        print("Înălțime construcție:", frame_height)
        print("Lățime construcție:", frame_width)
        print("Înălțime secțiune:", section_height)
        print("Latime secțiune:", section_width)
        print("Lungime profil H/bucată:", profile_h_length_per_piece)
        print("Lungime totala profil H:", profile_h_total)
        print("Lungime profil B/bucată:", profile_b_length_per_piece)
        print("Lungime totala profil B:", profile_b_total)
        print("Lungime profil O vertical:", profile_o_vertical_length * profile_o_vertical_count)
        print("Lungime profil O orizontal:", profile_o_horizontal_length * profile_o_horizontal_count)
        print("profile_O_orizontale:", profile_o_vertical_count)
        print("profile_O_verticale:", profile_o_horizontal_count)
        print("numarul de sine:", slide_track_amount)
        print("sectiuni mobile:", mobile_sections)
        print("sectiuni fixe:", fixed_sections)
        print("lățime sticlă:", glass_width)
        print("lungime sticlă:", glass_height)
        print("bucăți plat bandă:", plat_bande_amout)
        print("lungime plat bandă/bucată:", plat_bande_length_per_piece)
        print("bandă dublu adeziva:", adhesive_bande_length)
        print("Șuruburi:", screws)
        print("Lungime șina glisantă:", sliding_track_length)
        print("Profil îmbinare șina:", sliding_track_jointing_length)
        print("Bucăți îmbinare șina:", sliding_track_jointing_amount)
        print("Mască șină:", slide_track_mask)




        return [
            {"item": "Sticla","qty":1 ,"width": 900,"height":frame_height},
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