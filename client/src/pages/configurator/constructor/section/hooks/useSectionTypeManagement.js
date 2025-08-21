import { useCallback } from "react";

export const useSectionTypeManagement = (
  setSectionTypes,
  selectedCategory,
  sectionCount,
  slidingType,
  slidingMountType
) => {
  const handleSectionTypeChange = useCallback(
    (idx, type) => {
      if (typeof setSectionTypes === "function") {
        setSectionTypes((prev) => {
          const newTypes = [...prev];

          // For Sliding Doors mounted on wall - all sections are mobile and cannot be changed
          if (
            selectedCategory === "Sliding Doors" &&
            slidingMountType === "On wall"
          ) {
            return newTypes;
          }

          // For Sliding Doors with cascade type
          if (
            selectedCategory === "Sliding Doors" &&
            slidingType === "cascade"
          ) {
            // Only allow changing first or last section
            if (idx === 0 || idx === sectionCount - 1) {
              // Prima și ultima pot fi mobile/fixed
              if (idx === 0) {
                if (type === "mobile") {
                  newTypes[0] = "mobile";
                  newTypes[sectionCount - 1] = "fixed";
                } else if (type === "fixed") {
                  newTypes[0] = "fixed";
                  newTypes[sectionCount - 1] = "mobile";
                }
              } else if (idx === sectionCount - 1) {
                if (type === "mobile") {
                  newTypes[sectionCount - 1] = "mobile";
                  newTypes[0] = "fixed";
                } else if (type === "fixed") {
                  newTypes[sectionCount - 1] = "fixed";
                  newTypes[0] = "mobile";
                }
              }
            }
            // Secțiunile intermediare sunt mereu mobile
            for (let i = 1; i < sectionCount - 1; i++) {
              newTypes[i] = "mobile";
            }
          }
          // For regular Sliding Doors
          else if (selectedCategory === "Sliding Doors") {
            // Only allow "mobile" or "fixed"
            if (type === "mobile" || type === "fixed") {
              newTypes[idx] = type;
            }
          }
          // For Swing Doors
          else if (selectedCategory === "Swing Doors") {
            // Allow "left", "right", or "fixed"
            if (type === "left" || type === "right" || type === "fixed") {
              newTypes[idx] = type;
            }
          }
          // For Fixed Walls
          else if (selectedCategory === "Fixed Wall") {
            // Only allow "fixed"
            newTypes[idx] = "fixed";
          }

          return newTypes;
        });
      }
    },
    [
      setSectionTypes,
      selectedCategory,
      sectionCount,
      slidingType,
      slidingMountType,
    ]
  );

  return { handleSectionTypeChange };
};
