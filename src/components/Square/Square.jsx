import React from "react";
import "./Square.styles.css";

const Square = ({
  value,
  onClick,
  index,
  isWinning = false,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled && !value) {
      onClick(index);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      className={`square ${isWinning ? "winning" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      disabled={disabled || !!value}
      tabIndex={disabled || value ? -1 : 0}
      aria-label={`Quadrado ${index + 1}${
        value ? `, ocupado por ${value}` : ", vazio"
      }`}
    >
      {value && (
        <span className={`mark mark-${value.toLowerCase()}`}>{value}</span>
      )}
    </button>
  );
};

export default Square;
