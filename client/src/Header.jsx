import logo from './assets/logo.png'

const styles = {
    width: "auto", 
    height: "200%",
    cursor: "pointer",
    overflow: "hidden"
};

function Header() {
    return (<header className="header">
        <img style={styles} src={logo} alt="Logo" />
    </header>);
}

export default Header;