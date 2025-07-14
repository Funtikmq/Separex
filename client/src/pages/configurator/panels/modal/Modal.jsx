import { useEffect, useState } from "react";
import ModalSection from "./ModalSection";

function Modal({ onClose }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Activăm tranzițiile imediat după render
    requestAnimationFrame(() => {
      setIsActive(true);
    });
  }, []);

  const handleClose = () => {
    setIsActive(false);
    // Așteptăm finalul animației înainte de a închide modalul
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`modal-overlay ${isActive ? "active" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`modal-content ${isActive ? "active" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalSection />
      </div>
    </div>
  );
}

export default Modal;
