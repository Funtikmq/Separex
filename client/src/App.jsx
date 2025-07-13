import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Configurator from "./pages/configurator/Configurator";
import Home from "./pages/home/Home";
import Catalog from "./pages/catalog/Catalog";
import Basket from "./pages/basket/Basket";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Configurator" replace />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Configurator" element={<Configurator />} />
        <Route path="/Catalog" element={<Catalog />} />
        <Route path="/Basket" element={<Basket />} />
      </Routes>
    </Router>
  );
}

export default App;
