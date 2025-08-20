import React from "react";
import Square from "../Square";
import { GameBoardContainer, BoardGrid } from "./GameBoard.styles";

const GameBoard = ({
  board,
  onSquareClick,
  winningLine = [],
  disabled = false,
}) => {
  return (
    <GameBoardContainer>
      <BoardGrid>
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
      </BoardGrid>
    </GameBoardContainer>
  );
};

export default GameBoard;
