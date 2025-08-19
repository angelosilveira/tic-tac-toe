import React from "react";
import Square from "../Square";
import "./GameBoard.styles.css";

const GameBoard = ({
  board,
  onSquareClick,
  winningLine = [],
  disabled = false,
}) => {
  return (
    <div className="game-board">
      <div className="board-grid">
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={onSquareClick}
            index={index}
            isWinning={winningLine.includes(index)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
