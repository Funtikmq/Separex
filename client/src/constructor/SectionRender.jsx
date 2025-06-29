import React, { useState, useEffect, useCallback } from 'react';
import Section from "./Section.jsx";
import * as Models from "./ModelOverlays.jsx";

const modelComponents = {
  Line: Models.Line,
  "Double Line": Models.DoubleLine,
  "Triple Line": Models.TripleLine,
  Simetry: Models.Simetry,
  Trio: Models.Trio,
  Quatro: Models.Quatro,
  Five: Models.Five,
  Trend: Models.Trend,
  Nordic: Models.Nordic,
  Punto: Models.Punto,
  Geos: Models.Geos,
  Geometry: Models.Geometry,
  Star: Models.Star,
  Diez: Models.Diez,
  Loft: Models.Loft,
  Nimbus: Models.Nimbus,
  Modern: Models.Modern,
  Altus: Models.Altus,
};

const colorStyles = {
  Clear: { backgroundColor: "linear-gradient(225deg, rgba(150, 150, 150, 0.4) 30%, rgba(150,150,150,0.2) 100%)" },
  Frosted: { backgroundColor: "linear-gradient(90deg,rgba(255, 255, 255, 0.4) 30%,rgba(255,255,255,0.2) 100%)" },
  Grey: { backgroundColor: "linear-gradient(225deg, rgba(100, 100, 100, 0.4) 30%, rgba(100, 100, 100, 0.2) 100%)" },
  "Dark Grey": { backgroundColor: "linear-gradient(225deg, rgba(0, 0, 0, 0.4) 30%, rgba(0, 0, 0, 0.2) 100%)" },
  Bronze: { backgroundColor: "linear-gradient(225deg, rgba(205,125,50,0.4) 30%, rgba(255,215,160,0.2) 100%)" },
  Lacobel: { backgroundColor: "linear-gradient(225deg, rgba(255,255,255,0.9) 30%, rgba(230,230,230,0.9) 100%)" },
  Canelata: {
    backgroundColor: `repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 0px,
      rgba(255, 255, 255, 0.1) 2px,
      rgba(150, 150, 150, 0.1) 6px,
      rgba(150, 150, 150, 0.1) 9px
    )`
  }
};

const getModelOverlay = (modelName, scaled) => {
  if (!modelName || modelName === "Aero") return null;
  const Component = modelComponents[modelName];
  return Component ? <Component scaled={scaled} /> : null;
};

const getSectionColor = (sectionColors, index) =>
  colorStyles[sectionColors[index]] || null;

function SectionRenderer({
  selectedCategory,
  selectedType,
  scaled,
  sectionCount,
  selectedIndex,
  sectionModels,
  sectionColors,
  selectionVisible,
  setSelectionVisible,
  onClick,
}) {
  const initialDimensions = () => {
    if (selectedType === "2-Part Element O") {
  return { 
    height: 50,
    secondHeight: 50 
  };
}
if (selectedType === "4-Part Element O") {
  return { 
    height: 50,
    secondHeight: 50,
    width: 50,
    secondWidth: 50 
  };
}
    if (/^\d+-Part Element A$/.test(selectedType)) {
      const total = parseInt(selectedType.match(/^(\d+)-Part/)[1], 10);
      const rest = total - 1;
      return { 
        topHeight: 30,
        widths: Array(rest).fill(100 / rest)
      };
    }
    return { widths: Array(sectionCount).fill(100 / sectionCount) };
  };

  const [dimensions, setDimensions] = useState(initialDimensions);
  const [isResizing, setIsResizing] = useState(false);
  const [resizingIndex, setResizingIndex] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startDimensions, setStartDimensions] = useState(null);

  const isSelected = (i) => selectedIndex === i && selectionVisible;

  const handleVerticalResizeStart = (e) => {
    e.preventDefault();
    setIsResizing(true);
    setResizingIndex('vertical');
    setStartY(e.clientY);
    setStartDimensions({...dimensions});
  };

  const handleHorizontalResizeStart = (e) => {
    e.preventDefault();
    setIsResizing(true);
    setResizingIndex('horizontal');
    setStartX(e.clientX);
    setStartDimensions({...dimensions});
  };

  const handleTopSectionResizeStart = (e) => {
    e.preventDefault();
    setIsResizing(true);
    setResizingIndex('top');
    setStartY(e.clientY);
    setStartDimensions({...dimensions});
  };

  const handleSectionResizeStart = (e, index) => {
    e.preventDefault();
    setIsResizing(true);
    setResizingIndex(index);
    setStartX(e.clientX);
    setStartDimensions({...dimensions});
  };

  const handleResize = useCallback((e) => {
    if (!isResizing) return;

    const container = document.getElementById('sections-container');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();

    switch(resizingIndex) {
      case 'vertical':
  const deltaY = e.clientY - startY;
  const deltaYPercentage = (deltaY / containerRect.height) * 100;
  
  if (selectedType.includes("Part Element O")) {
    const newHeight = startDimensions.height + deltaYPercentage;
    if (newHeight >= 30 && newHeight <= 70) {
      setDimensions(prev => ({
        ...prev,
        height: newHeight,
        
        secondHeight: 100 - newHeight
      }));
    }
  }
  break;

case 'horizontal':
  if (selectedType === "4-Part Element O") {
    const deltaX = e.clientX - startX;
    const deltaXPercentage = (deltaX / containerRect.width) * 100;
    const newWidth = startDimensions.width + deltaXPercentage;
    if (newWidth >= 30 && newWidth <= 70) {
      setDimensions(prev => ({
        ...prev,
        width: newWidth,
        secondWidth: 100 - newWidth
      }));
    }
  }
  break;

      case 'top':
        const deltaTopY = e.clientY - startY;
        const deltaTopPercentage = (deltaTopY / containerRect.height) * 100;
        const newTopHeight = startDimensions.topHeight + deltaTopPercentage;
        
        if (newTopHeight >= 20 && newTopHeight <= 40) {
          setDimensions(prev => ({
            ...prev,
            topHeight: newTopHeight
          }));
        }
        break;

      default:
        if (typeof resizingIndex === 'number' && startDimensions.widths) {
          const deltaX = e.clientX - startX;
          const deltaXPercentage = (deltaX / containerRect.width) * 100;
          
          const newWidths = [...startDimensions.widths];
          const minWidth = 15;
          
          if (resizingIndex < newWidths.length - 1) {
            const newWidth1 = startDimensions.widths[resizingIndex] + deltaXPercentage;
            const newWidth2 = startDimensions.widths[resizingIndex + 1] - deltaXPercentage;
            
            if (newWidth1 >= minWidth && newWidth2 >= minWidth) {
              newWidths[resizingIndex] = newWidth1;
              newWidths[resizingIndex + 1] = newWidth2;
              setDimensions(prev => ({
                ...prev,
                widths: newWidths
              }));
            }
          }
        }
        break;
    }
  }, [isResizing, resizingIndex, startX, startY, startDimensions, selectedType]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
    setResizingIndex(null);
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleResizeEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing, handleResize, handleResizeEnd]);

  useEffect(() => {
    setDimensions(initialDimensions());
  }, [selectedType, sectionCount]);

  // Render pentru 2-Part Element O
  if (selectedType === "2-Part Element O") {
  return (
    <div id="sections-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {[0, 1].map((i) => (
        <Section
          key={i}
          index={i}
          total={2}
          onClick={() => { onClick(i); setSelectionVisible(true); }}
          style={{
            display: "flex",
            position: "absolute",
            top: `${i === 0 ? 0 : dimensions.height}%`,
            left: 0,
            width: "100%",
            height: `${i === 0 ? dimensions.height : dimensions.secondHeight}%`,
            transition: isResizing ? 'none' : 'all 0.3s ease',
            borderBottom: i === 0 ? `${scaled.borderPx/16}rem solid #222` : "0",
            ...getSectionColor(sectionColors, i),
            background: getSectionColor(sectionColors, i)?.backgroundColor || "transparent",
            filter: isSelected(i) ? "brightness(.1)" : "none",
            cursor: "pointer",
          }}
          children={getModelOverlay(sectionModels[i], scaled)}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          top: `${dimensions.height - 3}%`,
          left: 0,
          width: '100%',
          height: '6px',
          cursor: 'row-resize',
          zIndex: 10,
        }}
        onMouseDown={handleVerticalResizeStart}
      />
    </div>
  );
}

  // Render pentru 4-Part Element O
  if (selectedType === "4-Part Element O") {
  return (
    <div id="sections-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {[...Array(4).keys()].map((i) => {
        const row = Math.floor(i / 2);
        const col = i % 2;
        return (
          <Section
            key={i}
            index={i}
            total={4}
            onClick={() => { onClick(i); setSelectionVisible(true); }}
            style={{
              position: "absolute",
              top: `${row === 0 ? 0 : dimensions.height}%`,
              left: `${col === 0 ? 0 : dimensions.width}%`,
              width: `${col === 0 ? dimensions.width : dimensions.secondWidth}%`,
              height: `${row === 0 ? dimensions.height : dimensions.secondHeight}%`,
              transition: isResizing ? 'none' : 'all 0.3s ease',
              borderRight: col === 0 ? `${scaled.borderPx}px solid #222` : "0",
              borderBottom: row === 0 ? `${scaled.borderPx}px solid #222` : "0",
              ...getSectionColor(sectionColors, i),
              background: getSectionColor(sectionColors, i)?.backgroundColor || "transparent",
              filter: isSelected(i) ? "brightness(0.1)" : "none",
              cursor: "pointer",
            }}
            children={getModelOverlay(sectionModels[i], scaled)}
          />
        );
      })}
      <div
        style={{
          position: 'absolute',
          top: `${dimensions.height - 3}%`,
          left: 0,
          width: '100%',
          height: '6px',
          cursor: 'row-resize',
          zIndex: 10,
        }}
        onMouseDown={handleVerticalResizeStart}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `${dimensions.width - 3}%`,
          width: '6px',
          height: '100%',
          cursor: 'col-resize',
          zIndex: 10,
        }}
        onMouseDown={handleHorizontalResizeStart}
      />
    </div>
  );
}

  // Render pentru X-Part Element A
  if (/^\d+-Part Element A$/.test(selectedType)) {
    const total = parseInt(selectedType.match(/^(\d+)-Part/)[1], 10);
    const rest = total - 1;
    const widths = dimensions.widths || Array(rest).fill(100 / rest);

    return (
      <div id="sections-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Section
          key={0}
          index={0}
          total={total}
          onClick={() => { onClick(0); setSelectionVisible(true); }}
          style={{
            position: "absolute",
            top: "0%",
            left: 0,
            width: "100%",
            height: `${dimensions.topHeight}%`,
            transition: isResizing ? 'none' : 'all 0.3s ease',
            borderBottom: `${scaled.borderPx}px solid #222`,
            ...getSectionColor(sectionColors, 0),
            background: getSectionColor(sectionColors, 0)?.backgroundColor || "transparent",
            filter: isSelected(0) ? "brightness(0.1)" : "none",
            cursor: "pointer",
          }}
          children={getModelOverlay(sectionModels[0], scaled)}
        />

        {[...Array(rest).keys()].map((i) => (
          <React.Fragment key={i + 1}>
            <Section
              index={i + 1}
              total={total}
              onClick={() => { onClick(i + 1); setSelectionVisible(true); }}
              style={{
                position: "absolute",
                top: `${dimensions.topHeight}%`,
                left: `${widths.slice(0, i).reduce((a, b) => a + b, 0)}%`,
                width: `${widths[i]}%`,
                height: `${100 - dimensions.topHeight}%`,
                transition: isResizing ? 'none' : 'all 0.3s ease',
                borderRight: i < rest - 1 ? `${scaled.borderPx}px solid #222` : "0",
                ...getSectionColor(sectionColors, i + 1),
                background: getSectionColor(sectionColors, i + 1)?.backgroundColor || "transparent",
                filter: isSelected(i + 1) ? "brightness(0.1)" : "none",
                cursor: "pointer",
              }}
              children={getModelOverlay(sectionModels[i + 1], scaled)}
            />
            {i < rest - 1 && (
              <div
                style={{
                  position: 'absolute',
                  top: `${dimensions.topHeight}%`,
                  left: `${widths.slice(0, i + 1).reduce((a, b) => a + b, 0) - 3}%`,
                  width: '6px',
                  height: `${100 - dimensions.topHeight}%`,
                  cursor: 'col-resize',
                  backgroundColor: isResizing && resizingIndex === i ? 'rgba(0,0,0,0.2)' : 'transparent',
                  zIndex: 10,
                }}
                onMouseDown={(e) => handleSectionResizeStart(e, i)}
              />
            )}
          </React.Fragment>
        ))}

        <div
          style={{
            position: 'absolute',
            top: `${dimensions.topHeight - 3}%`,
            left: 0,
            width: '100%',
            height: '6px',
            cursor: 'row-resize',
            zIndex: 10,
          }}
          onMouseDown={handleTopSectionResizeStart}
        />
      </div>
    );
  }

  // Default render pentru alte tipuri
  return (
    <div 
      id="sections-container" 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        display: 'flex',
        overflow: 'hidden'
      }}
    >
      {[...Array(sectionCount).keys()].map((i) => {
        const widths = dimensions.widths || Array(sectionCount).fill(100 / sectionCount);
        return (
          <div
            key={i}
            style={{
              position: 'relative',
              width: `${widths[i]}%`,
              height: '100%',
              transition: isResizing ? 'none' : 'width 0.3s ease',
              borderRight: i < sectionCount - 1 ? `${scaled.borderPx}px solid #222` : "0",
              ...getSectionColor(sectionColors, i),
              background: getSectionColor(sectionColors, i)?.backgroundColor || "transparent",
            }}
          >
            <Section
              index={i}
              total={sectionCount}
              onClick={() => { onClick(i); setSelectionVisible(true); }}
              style={{
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                filter: isSelected(i) ? "brightness(0.5) contrast(1.2)" : "none",
              }}
              children={getModelOverlay(sectionModels[i], scaled)}
            />
            {i < sectionCount - 1 && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: -3,
                  width: 6,
                  height: '100%',
                  cursor: 'col-resize',
                  backgroundColor: isResizing && resizingIndex === i ? 'rgba(0,0,0,0.2)' : 'transparent',
                  zIndex: 10,
                }}
                onMouseDown={(e) => handleSectionResizeStart(e, i)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SectionRenderer;