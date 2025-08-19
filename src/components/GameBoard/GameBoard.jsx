import React from "react";
import Square from "../Square";

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

      <style jsx>{`
        .game-board {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          animation: fade-in-up 0.5s ease-out;
        }

        .board-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          padding: 1rem;
          background: var(--color-background, #f8fafc);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .board-grid {
            width: 280px;
            height: 280px;
            gap: 6px;
            padding: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .board-grid {
            width: 250px;
            height: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default GameBoard;
