export const handleGenerateAndDownloadPDF = async (productData) => {
  console.log("Product Data:", productData);

  try {
    const response = await fetch("http://localhost:5000/generate/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: productData?.category,
        type: productData?.type,
        mountType: productData?.mountType,
        dimensions: productData?.dimensions,
        sectionType: productData?.sectionType,
        sectionDimensions: productData?.sectionDimensions,
        models: productData?.sectionModels,
        colors: productData?.sectionColors,
        handles: productData?.handles,
        price: productData?.price,
      }),
    });

    if (!response.ok) {
      throw new Error("Error generating PDF");
    }

    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `-${productData?.category}-${productData?.type}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
