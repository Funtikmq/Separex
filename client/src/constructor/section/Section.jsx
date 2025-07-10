import SectionAxis from "./SectionAxis";

function Section({ 
    style, 
    onClick, 
    children, 
    selectedType,      
    doorDimensions,
    sectionDimensions,
    index          
}) {
    let overlay = null;
    let handle = null;
    let radio = null;

    if (Array.isArray(children)) {
        children.forEach(child => {
            if (!child) return;
            
            if (child.type === 'div') {
                radio = child;
            } else if (child.props?.scaled) {
                if (child.props.position) {
                    handle = child;
                } else {
                    overlay = child;
                }
            }
        });
    } else {
        overlay = children;
    }

    return (
        <div 
            className="doorSection" 
            style={{
                ...style,
                position: 'relative',
                overflow: 'visible'
            }} 
            onClick={onClick}
        >
            {overlay}
            {handle && (
                <div style={{
                    position: 'relative',
                    zIndex: 100,
                    pointerEvents: 'none'
                }}>
                    {handle}
                </div>
            )}
            {radio}
            <SectionAxis 
                selectedType={selectedType} 
                index={index} 
                doorDimensions={doorDimensions} 
                sectionDimensions={sectionDimensions} 
            />
        </div>
    );
}

export default Section;