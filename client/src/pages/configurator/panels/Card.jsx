import { useState } from "react";
import Modal from "./modal/Modal";

function Card({ title, image, onClick, disabled, isSelected, activeItem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div
      className="cardContainer"
      onClick={disabled ? null : onClick}
      title={disabled ? "Not available for fixed sections" : title}
    >
      <div
        className={`card ${disabled ? "disabled" : ""} ${
          isSelected ? "selected" : ""
        }`}
      >
        <img src={image} alt={title} className="cardImage" />
      </div>
      <div className="cardComponents">
        <h2 className={`cardTitle ${disabled ? "text-disabled" : ""}`}>
          {title}
        </h2>
        {activeItem === "Model" && (
          <button className="cardButton" onClick={handleModalOpen}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          </button>
        )}
      </div>
      {isModalOpen && <Modal onClose={handleModalClose} />}
    </div>
  );
}

export default Card;
