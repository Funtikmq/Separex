import SectionAxis from "./SectionAxis";

function Section({ style, onClick, children, selectedType,index}) {
    let overlay = null;
    let radio = null;
    if (Array.isArray(children)) {
        overlay = children.find(child => child && child.type !== 'div');
        radio = children.find(child => child && child.type === 'div');
    } else {
        overlay = children;
    }
    return (
        <div className="doorSection" style={style} onClick={onClick}>
            {overlay}
            {radio}
            <SectionAxis selectedType={selectedType} index={index} />
        </div>
        
    );
}

export default Section;