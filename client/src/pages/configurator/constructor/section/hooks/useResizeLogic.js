import { useCallback } from "react";
import { MIN_WIDTH, MAX_WIDTH } from "../constants/sectionConstants";

export const useResizeLogic = ({
  selectedCategory,
  doorDimensions,
  selectedType,
  setSectionDimensions,
  updateDimensions,
}) => {
  const handleResize = useCallback(
    (e, resizingIndex, startX, startY, startDimensions) => {
      if (selectedCategory === "Sliding Doors") return;

      const container = document.getElementById("sections-container");
      if (!container) return;

      const containerRect = container.getBoundingClientRect();

      switch (resizingIndex) {
        case "vertical": {
          const deltaY = e.clientY - startY;
          const deltaYPercentage = (deltaY / containerRect.height) * 100;

          if (selectedType.includes("Part Element O")) {
            const newHeight = startDimensions.height + deltaYPercentage;

            if (newHeight >= MIN_WIDTH && newHeight <= MAX_WIDTH) {
              const newDimensions = {
                ...startDimensions,
                height: newHeight,
                secondHeight: 100 - newHeight,
              };

              updateDimensions(newDimensions);

              if (typeof setSectionDimensions === "function") {
                const totalHeight = doorDimensions.height;
                const h1 = Math.round((newHeight / 100) * totalHeight);
                const h2 = totalHeight - h1;

                if (selectedType === "4-Part Element O") {
                  setSectionDimensions((prev) => [
                    h1,
                    h2,
                    prev[2] || doorDimensions.width / 2,
                    prev[3] || doorDimensions.width / 2,
                  ]);
                } else {
                  setSectionDimensions([h1, h2]);
                }
              }
            }
          }
          break;
        }

        case "horizontal": {
          const deltaX = e.clientX - startX;
          const deltaXPercentage = (deltaX / containerRect.width) * 100;

          if (selectedType === "4-Part Element O") {
            const newWidth = startDimensions.width + deltaXPercentage;

            if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
              const newDimensions = {
                ...startDimensions,
                width: newWidth,
                secondWidth: 100 - newWidth,
              };

              updateDimensions(newDimensions);

              if (typeof setSectionDimensions === "function") {
                const totalWidth = doorDimensions.width;
                const w1 = Math.round((newWidth / 100) * totalWidth);
                const w2 = totalWidth - w1;

                setSectionDimensions((prev) => [
                  prev[0] || doorDimensions.height / 2,
                  prev[1] || doorDimensions.height / 2,
                  w1,
                  w2,
                ]);
              }
            }
          }
          break;
        }

        case "top": {
          const deltaY = e.clientY - startY;
          const deltaYPercentage = (deltaY / containerRect.height) * 100;
          const newTopHeight = startDimensions.topHeight + deltaYPercentage;

          if (newTopHeight >= MIN_WIDTH && newTopHeight <= MAX_WIDTH) {
            const newDimensions = {
              ...startDimensions,
              topHeight: newTopHeight,
            };

            updateDimensions(newDimensions);

            if (typeof setSectionDimensions === "function") {
              const totalHeight = doorDimensions.height;
              const topH = Math.round((newTopHeight / 100) * totalHeight);

              setSectionDimensions((prev) => [topH, ...prev.slice(1)]);
            }
          }
          break;
        }

        default: {
          if (typeof resizingIndex === "number" && startDimensions.widths) {
            const deltaX = e.clientX - startX;
            const deltaXPercentage = (deltaX / containerRect.width) * 100;

            const newWidths = [...startDimensions.widths];
            if (resizingIndex < newWidths.length - 1) {
              const newWidth1 = newWidths[resizingIndex] + deltaXPercentage;
              const newWidth2 = newWidths[resizingIndex + 1] - deltaXPercentage;

              if (newWidth1 >= MIN_WIDTH && newWidth2 >= MIN_WIDTH) {
                newWidths[resizingIndex] = newWidth1;
                newWidths[resizingIndex + 1] = newWidth2;

                const newDimensions = {
                  ...startDimensions,
                  widths: newWidths,
                };

                updateDimensions(newDimensions);

                if (typeof setSectionDimensions === "function") {
                  const totalWidth = doorDimensions.width;
                  const sectionWidths = newWidths.map((w) =>
                    Math.round((w / 100) * totalWidth)
                  );

                  if (selectedType.includes("Part Element A")) {
                    setSectionDimensions((prev) => [prev[0], ...sectionWidths]);
                  } else {
                    setSectionDimensions(sectionWidths);
                  }
                }
              }
            }
          }
          break;
        }
      }
    },
    [
      selectedCategory,
      doorDimensions,
      selectedType,
      setSectionDimensions,
      updateDimensions,
    ]
  );

  return { handleResize };
};
