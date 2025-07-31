import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth, signOut } from "./profile/firebase/firebase";
import logo from "@assets/logo.png";

function Header() {
  const navigate = useNavigate();

  const { user, loading } = useAuth();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="header">
      <div className="headerLeft">
        <img
          className="headerImg"
          src={logo}
          alt="Logo"
          onClick={() => navigate("/Home")}
        />
      </div>

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
        <div className="headerItem" onClick={() => navigate("/Profile")}>
          {!loading && user?.photoURL ? (
            <img
              src={user.photoURL}
              className="profileAvatar"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                objectFit: "cover",
                backgroundColor: "gray",
              }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/32";
              }}
            />
          ) : (
            "Profile"
          )}
        </div>
      </nav>

      <div className="headerRight">
        {!loading && user && (
          <button className="headerButton" onClick={handleLogOut}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-log-out-icon lucide-log-out"
            >
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
