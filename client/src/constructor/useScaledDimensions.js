import { useEffect, useState } from "react";

export function useScaledDimensions(height, width) {
  const [scaled, setScaled] = useState({ scaledWidth: 0, scaledHeight: 0, borderPx: 0 });

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      const maxHeight = vh * 0.65; 
      const maxWidth = vw * 0.4;  

      const heightRatio = maxHeight / height;
      const widthRatio = maxWidth / width;

      const scale = Math.min(heightRatio, widthRatio);

      const scaledHeight = height * scale;
      const scaledWidth = width * scale;

      const borderMM = 22;
      const rawBorderPx = (borderMM / height) * scaledHeight;
      const borderPx = Math.min(rawBorderPx, 22);

      setScaled({ scaledWidth, scaledHeight, borderPx });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [height, width]);

  return scaled;
}