import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { DoorsProvider } from "./context/DoorsContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import Configurator from "./pages/configurator/Configurator";
import Home from "./pages/home/Home";
import Catalog from "./pages/catalog/Catalog";
import Cart from "./pages/cart/Cart";

function App() {
  return (
    <Router>
      <DoorsProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/Configurator" replace />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Configurator" element={<Configurator />} />
            <Route path="/Catalog" element={<Catalog />} />
            <Route path="/Cart" element={<Cart />} />
          </Routes>
        </CartProvider>
      </DoorsProvider>
    </Router>
  );
}

export default App;
