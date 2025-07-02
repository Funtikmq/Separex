function Section({ style, onClick, children }) {
    return (
        <div
            className="doorSection" style={style} onClick={onClick}>{children}</div>
    );
}

export default Section;