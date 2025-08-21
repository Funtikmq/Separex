function NavigationItem({ icon, label, isActive, onClick }) {
  return (
    <li
      className={`navigationItem ${isActive ? "active" : ""}`}
      onClick={onClick}
      style={{ display: "flex", alignItems: "center", gap: "8px" }}
    >
      {icon}
      <h4>{label}</h4>
    </li>
  );
}

export default NavigationItem;
