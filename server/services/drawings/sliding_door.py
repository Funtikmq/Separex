from ezdxf.enums import TextEntityAlignment

def sliding_door(msp, data):
    width = float(data.get("dimensions", {}).get("width", 100))
    height = float(data.get("dimensions", {}).get("height", 50))

    border = 22.5

    # Stâlpul vertical din stânga
    msp.add_lwpolyline([
        (0, 0),
        (border, 0),
        (border, height),
        (0, height),
        (0, 0)
    ], close=True)

    # Stâlpul vertical din dreapta
    msp.add_lwpolyline([
        (width - border, 0),
        (width, 0),
        (width, height),
        (width - border, height),
        (width - border, 0)
    ], close=True)

    # Bara orizontală de sus
    msp.add_lwpolyline([
        (border, height - border),
        (width - border, height - border),
        (width - border, height),
        (border, height),
        (border, height - border)
    ], close=True)

    # Bara orizontală de jos
    msp.add_lwpolyline([
        (border, 0),
        (width - border, 0),
        (width - border, border),
        (border, border),
        (border, 0)
    ], close=True)

    # ---- DIMENSIUNI CU TEXT ----
    dim_offset = max(width, height) * 0.05  # distanță față de obiect
    text_size = max(width, height) * 0.03  # text proporțional

    # Dimensiune orizontală (lățime)
    dim1 = msp.add_linear_dim(
        base=(0, -dim_offset),
        p1=(border, 0),
        p2=(width-border, 0),
        angle=0,
        dxfattribs={"color": 1}  # roșu
    )
    dim1.render()

    # Dimensiune verticală (înălțime)
    dim2 = msp.add_linear_dim(
        base=(-dim_offset, 0),
        p1=(0, 0),
        p2=(0, height),
        angle=90,
        dxfattribs={"color": 1}  # roșu
    )
    dim2.render()

    # Text pentru lățime (centru jos)
    msp.add_text(f"{width-2*border:.0f} mm", dxfattribs={"height": text_size, "color": 1}).set_placement(
        (width / 2, -dim_offset * 1.5),
        align=TextEntityAlignment.MIDDLE_CENTER
    )

    # Text pentru înălțime (centru stânga)
    msp.add_text(f"{height:.0f} mm", dxfattribs={"height": text_size, "color": 1}).set_placement(
        (-dim_offset * 1.5, height / 2),
        align=TextEntityAlignment.MIDDLE_CENTER
    )