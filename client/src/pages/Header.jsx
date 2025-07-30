import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "@assets/logo.png";

function Header() {
  const navigate = useNavigate();

  const { user } = useAuth();

  return (
    <header className="header">
      <img
        className="headerImg"
        src={logo}
        alt="Logo"
        onClick={() => navigate("/Home")}
      />
      <nav className="headerNavigation">
        <div className="headerItem" onClick={() => navigate("/Home")}>
          Home
        </div>
        <div className="headerItem" onClick={() => navigate("/Catalog")}>
          Catalog
        </div>
        <div className="headerItem" onClick={() => navigate("/Configurator")}>
          Configurator
        </div>
        <div className="headerItem" onClick={() => navigate("/Cart")}>
          Cart
        </div>
      </nav>
      <div className="headerProfile" onClick={() => navigate("/Profile")}>
        {user && user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="profileAvatar"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          "Profile"
        )}
      </div>
    </header>
  );
}

export default Header;
