export const handleGenerateAndDownloadDXF = async (product) => {
  try {
    const response = await fetch("http://localhost:5000/generate/dxf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) throw new Error("Failed to generate DXF");

    // Convertește răspunsul în blob
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Creează un link pentru download
    const link = document.createElement("a");
    link.href = url;
    link.download = `${product.category || "order"}.dxf`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating DXF:", error);
  }
};
