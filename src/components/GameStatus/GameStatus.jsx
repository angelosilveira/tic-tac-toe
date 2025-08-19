import React from "react";
import { Trophy, Users, RotateCcw } from "lucide-react";

const GameStatus = ({ gameStatus, winner, onNewGame, onUpdateScore }) => {
  const handleNewGame = () => {
    if (gameStatus === "won" && winner) {
      onUpdateScore(winner);
    } else if (gameStatus === "draw") {
      onUpdateScore("draw");
    }
    onNewGame();
  };

  if (gameStatus === "playing") {
    return null;
  }

  return (
    <div className="game-status">
      <div className="status-content">
        {gameStatus === "won" ? (
          <div className="winner-announcement">
            <Trophy className="trophy-icon" size={32} />
            <h2 className="status-title">Jogador {winner} Venceu!</h2>
            <p className="status-message">Parabéns pela vitória!</p>
          </div>
        ) : (
          <div className="draw-announcement">
            <Users className="draw-icon" size={32} />
            <h2 className="status-title">Empate!</h2>
            <p className="status-message">Que jogo equilibrado!</p>
          </div>
        )}

        <button className="new-game-button" onClick={handleNewGame}>
          <RotateCcw size={20} />
          Novo Jogo
        </button>
      </div>

      <style jsx>{`
        .game-status {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          border-radius: 16px;
          animation: fade-in 0.3s ease;
        }

        .status-content {
          background: var(--color-boardBg, #ffffff);
          padding: 2rem;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          max-width: 300px;
          width: 90%;
          animation: scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .winner-announcement,
        .draw-announcement {
          margin-bottom: 1.5rem;
        }

        .trophy-icon {
          color: var(--color-secondary, #10b981);
          margin-bottom: 0.75rem;
        }

        .draw-icon {
          color: var(--color-textSecondary, #6b7280);
          margin-bottom: 0.75rem;
        }

        .status-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--color-textPrimary, #1f2937);
          margin: 0 0 0.5rem 0;
        }

        .status-message {
          color: var(--color-textSecondary, #6b7280);
          margin: 0;
        }

        .new-game-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: var(--color-primary, #1e40af);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }

        .new-game-button:hover {
          background: var(--color-secondary, #10b981);
          transform: scale(1.05);
        }

        .new-game-button:active {
          transform: scale(0.95);
        }

        .new-game-button:focus {
          outline: 3px solid var(--color-secondary, #10b981);
          outline-offset: 2px;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default GameStatus;
