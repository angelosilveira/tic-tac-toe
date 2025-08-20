import React from "react";
import { SquareButton, Mark } from "./Square.styles";

const Square = ({
  value,
  onClick,
  index,
  isWinning = false,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!value) {
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
    <SquareButton
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      disabled={disabled || !!value}
      isWinning={isWinning}
      tabIndex={disabled || value ? -1 : 0}
      aria-label={`Quadrado ${index + 1}${
        value ? `, ocupado por ${value}` : ", vazio"
      }`}
      data-winning={isWinning}
    >
      {value && <Mark value={value}>{value}</Mark>}
    </SquareButton>
  );
};

export default Square;
