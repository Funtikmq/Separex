function NavigationItem({ children, isActive, onClick, img }) {
    return (
        <li className={`navigationItem ${isActive ? "active" : ""}`} onClick={onClick}>
            <img width="25px" src={img} alt=""/>
            <h3>{children}</h3>
        </li>
    );
}

export default NavigationItem;