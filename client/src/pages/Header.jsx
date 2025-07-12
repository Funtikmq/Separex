import { useNavigate } from 'react-router-dom';
import logo from '@assets/logo.png'

function Header() {
    const navigate = useNavigate();

    return (
    <header className="header">
            <img className='headerImg' src={logo} alt="Logo" onClick={() => navigate('/Home')} />
        <nav className='headerNavigation'>
            <div className='headerItem' onClick={()=> navigate('/Home')}>Home</div>
            <div className='headerItem' onClick={()=> navigate('/Catalog')}>Catalog</div>
            <div className='headerItem' onClick={()=> navigate('/Configurator')}>Configurator</div>
            <div className='headerItem' onClick={()=> navigate('/Basket')}>Basket</div>
        </nav>
    </header>);
}

export default Header;