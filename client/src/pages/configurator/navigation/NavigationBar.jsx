import { useState, useEffect, useRef } from "react";
import NavigationItem from "./NavigationItem";
import NavigationPanel from "./NavigationPanel";

function NavigationBar({
  doorDimensions,
  setDoorDimensions,
  setSectionCount,
  sectionCount,
  slidingMountType,
  setSlidingMountType,
  slidingType,
  setSlidingType,
  selectedCategory,
  selectedIndex,
  setSelectedCategory,
  setSelectedType,
  selectedType,
  setSectionModels,
  sectionModels,
  setSectionColors,
  sectionColors,
  setProfileColor,
  selectedHandle,
  setSelectedHandle,
  doorFrameRef,
  sectionDimensions,
  setSectionDimensions,
  sectionTypes,
}) {
  const [activeItem, setActiveItem] = useState(null);
  const wrapperRef = useRef(null);

  const items = [
    "Category",
    "Type",
    "Dimensions",
    "Models",
    "Handles",
    "Colors",
  ];
  const itemSvg = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        color="currentColor"
      >
        <path d="M16.613 16.085C13.98 17.568 12.477 20.64 12 21.5V8c.415-.746 1.602-2.884 3.632-4.336c.855-.612 1.282-.918 1.825-.64c.543.28.543.896.543 2.127v8.84c0 .666 0 .999-.137 1.232c-.136.234-.508.443-1.25.862" />
        <path d="M12 7.806c-.687-.722-2.678-2.436-6.02-3.036c-1.692-.305-2.538-.457-3.26.126C2 5.48 2 6.426 2 8.321v6.809c0 1.732 0 2.598.463 3.139c.462.54 1.48.724 3.518 1.09c1.815.326 3.232.847 4.258 1.37c1.01.514 1.514.771 1.761.771s.752-.257 1.76-.771c1.027-.523 2.444-1.044 4.26-1.37c2.036-.366 3.055-.55 3.517-1.09c.463-.541.463-1.407.463-3.14V8.322c0-1.894 0-2.841-.72-3.425C20.557 4.313 19 4.77 18 5.5" />
      </g>
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m17.71 20.4l-.007-.018V3.525a.1.1 0 0 0 0-.086a.09.09 0 0 0-.078-.046h-4.634a.1.1 0 0 0-.1.1v16.912a.1.1 0 0 0 .008.038a.09.09 0 0 0 .087.069h4.625a.09.09 0 0 0 .091-.091zm-.2-.058l-4.417-.015v-9.2h.73v-.223h-.73V3.585l4.417.015zm.978-17.789h-6.281v18.825h6.28zm-.618 18.208h-5.253V3.171h5.257zm-12.123.617h6.325V2.553H5.747ZM6.364 3.17h5.258v17.591H6.364Zm12.628 18.228V2.023H5.242v20h13.75Zm-.413.071H5.656V2.462h12.923Zm-7.24-1.062l-.007-.018V3.53a.1.1 0 0 0 0-.088a.09.09 0 0 0-.078-.045h-4.63a.1.1 0 0 0-.094.1v16.912a.1.1 0 0 0 .008.038a.09.09 0 0 0 .087.07h4.625a.09.09 0 0 0 .09-.092zm-.2-9.567v.091h-.727v.223h.727v9.2l-4.422-.02V3.588l4.417.015z"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 36 36"
    >
      <path
        fill="currentColor"
        d="M9 17.41V27h9.59l-2-2H11v-5.59l-2-2z"
        className="clr-i-outline clr-i-outline-path-1"
      />
      <path
        fill="currentColor"
        d="M34.87 32.29L32 29.38V32H4v-4.15h2v-1.6H4V19.6h2V18H4v-6.4h2V10H4V4.41l15.94 15.85v-2.82L3.71 1.29A1 1 0 0 0 2 2v31a1 1 0 0 0 1 1h31.16a1 1 0 0 0 .71-1.71Z"
        className="clr-i-outline clr-i-outline-path-2"
      />
      <path
        fill="currentColor"
        d="M24 30h4a2 2 0 0 0 2-2V8.7l-2.3-4.23a2 2 0 0 0-1.76-1a2 2 0 0 0-1.76 1.08L22 8.72V28a2 2 0 0 0 2 2Zm0-20.8l1.94-3.77L28 9.21V24h-4Zm0 16.43h4v2.44h-4Z"
        className="clr-i-outline clr-i-outline-path-3"
      />
      <path fill="none" d="M0 0h36v36H0z" />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M21 2H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1ZM8 20H4V4h4Zm12 0H10v-7h10Zm0-9H10V4h10Z"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      >
        <rect width="26" height="40" x="6" y="4" rx="2" />
        <path d="M14 34h10m18-14v-6H23a5 5 0 1 0 0 6h19Z" />
      </g>
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 1024 960"
    >
      <path
        fill="currentColor"
        d="M1024 640q0 87-43 160.5T864.5 917T704 960q-106 0-192-64q-86 64-192 64q-87 0-160.5-43T43 800.5T0 640q0-97 53.5-176.5T193 346q-1-16-1-26q0-87 43-160.5T351.5 43T512 0t160.5 43T789 159.5T832 320q0 2-2 26h1q86 38 139.5 117.5T1024 640zm-960 0q0 106 75 181t181 75q79 0 144-45q-80-91-80-211q0-7 2-26h-1q61 26 127 26t126-26q-5-70-38.5-129.5T512 385q-54 40-87.5 100T385 614v-1q-64-28-111.5-80.5T206 412q-64 32-103 93T64 640zM512 64q-106 0-181 75t-75 181v3l1 3q32-6 63-6q107 0 192 64q85-64 192-64q32 0 64 6v-6q0-106-75-181T512 64zm306 348q-20 68-67.5 121T639 614h-1q2 19 2 26q0 120-80 211q65 45 144 45q106 0 181-75t75-181q0-74-39-135t-103-93z"
      />
    </svg>,
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      const clickedInsidePanel =
        wrapperRef.current && wrapperRef.current.contains(event.target);
      const clickedInsideDoorFrame =
        doorFrameRef.current && doorFrameRef.current.contains(event.target);

      if (!clickedInsidePanel && !clickedInsideDoorFrame) {
        setActiveItem(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [doorFrameRef]);

  return (
    <div ref={wrapperRef} style={{ display: "flex" }}>
      <nav>
        <ul className="navigationBar">
          {items.map((item, index) => (
            <NavigationItem
              key={item}
              icon={itemSvg[index]}
              label={item}
              isActive={activeItem === item}
              onClick={() => setActiveItem(item)}
            />
          ))}
        </ul>
      </nav>
      <NavigationPanel
        activeItem={activeItem}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        doorDimensions={doorDimensions}
        setDoorDimensions={setDoorDimensions}
        setSectionCount={setSectionCount}
        sectionCount={sectionCount}
        slidingMountType={slidingMountType}
        setSlidingMountType={setSlidingMountType}
        slidingType={slidingType}
        setSlidingType={setSlidingType}
        setSelectedType={setSelectedType}
        selectedType={selectedType}
        setSectionModels={setSectionModels}
        sectionModels={sectionModels}
        setSectionColors={setSectionColors}
        sectionColors={sectionColors}
        setProfileColor={setProfileColor}
        selectedHandle={selectedHandle}
        setSelectedHandle={setSelectedHandle}
        selectedIndex={selectedIndex}
        sectionDimensions={sectionDimensions}
        setSectionDimensions={setSectionDimensions}
        sectionTypes={sectionTypes}
      />
    </div>
  );
}

export default NavigationBar;
