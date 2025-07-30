import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { DoorsProvider } from "./context/DoorsContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import Configurator from "./pages/configurator/Configurator";
import Home from "./pages/home/Home";
import Catalog from "./pages/catalog/Catalog";
import Cart from "./pages/cart/Cart";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <DoorsProvider>
          <CartProvider>
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/Configurator" replace />}
              />
              <Route path="/Home" element={<Home />} />
              <Route path="/Configurator" element={<Configurator />} />
              <Route path="/Catalog" element={<Catalog />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Profile" element={<Profile />} />
            </Routes>
          </CartProvider>
        </DoorsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
