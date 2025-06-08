export function scaleDoor(height, width, padding) {
  const aspectRatio = width / height;
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  const maxHeight = viewportHeight * 0.55;
  const maxWidth = viewportWidth * 0.4 - padding * 2;

  let scaledHeight = maxHeight;
  let scaledWidth = scaledHeight * aspectRatio;

  if (scaledWidth > maxWidth) {
    scaledWidth = maxWidth;
    scaledHeight = scaledWidth / aspectRatio;
  }

  const borderMM = 22;
  const rawBorderPx = (borderMM / height) * scaledHeight;
  const borderPx = Math.min(rawBorderPx, 22);

  return { scaledWidth, scaledHeight, borderPx };
}