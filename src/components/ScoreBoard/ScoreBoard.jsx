import React, { useState, useEffect } from "react";
import { Trophy, Target, Users } from "lucide-react";

const ScoreBoard = ({ scores, onReset }) => {
  const { playerXScore = 0, playerOScore = 0, draws = 0 } = scores;
  const totalGames = playerXScore + playerOScore + draws;

  const [animateX, setAnimateX] = useState(false);
  const [animateO, setAnimateO] = useState(false);
  const [animateDraw, setAnimateDraw] = useState(false);

  useEffect(() => {
    if (playerXScore > 0) {
      setAnimateX(true);
      setTimeout(() => setAnimateX(false), 300);
    }
  }, [playerXScore]);

  useEffect(() => {
    if (playerOScore > 0) {
      setAnimateO(true);
      setTimeout(() => setAnimateO(false), 300);
    }
  }, [playerOScore]);

  useEffect(() => {
    if (draws > 0) {
      setAnimateDraw(true);
      setTimeout(() => setAnimateDraw(false), 300);
    }
  }, [draws]);

  return (
    <div className="scoreboard">
      <div className="scoreboard-header">
        <Trophy className="trophy-icon" size={24} />
        <h2 className="scoreboard-title">Placar</h2>
      </div>

      <div className="score-grid">
        <div className="score-item player-x">
          <div className="score-label">
            <span className="player-symbol">X</span>
            <span>Jogador X</span>
          </div>
          <div
            className={`score-value ${animateX ? "score-updated" : ""}`}
            key={playerXScore}
          >
            {playerXScore}
          </div>
        </div>

        <div className="score-item player-o">
          <div className="score-label">
            <span className="player-symbol">O</span>
            <span>Jogador O</span>
          </div>
          <div
            className={`score-value ${animateO ? "score-updated" : ""}`}
            key={playerOScore}
          >
            {playerOScore}
          </div>
        </div>

        <div className="score-item draws">
          <div className="score-label">
            <Users size={16} />
            <span>Empates</span>
          </div>
          <div
            className={`score-value ${animateDraw ? "score-updated" : ""}`}
            key={draws}
          >
            {draws}
          </div>
        </div>
      </div>

      <div className="scoreboard-footer">
        <div className="total-games">
          <Target size={16} />
          <span>Total: {totalGames} jogos</span>
        </div>

        {totalGames > 0 && (
          <button
            className="reset-button"
            onClick={onReset}
            aria-label="Resetar placar"
          >
            Resetar Placar
          </button>
        )}
      </div>

      <style jsx>{`
        .scoreboard {
          background: var(--color-boardBg, #ffffff);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 2px solid var(--color-primary, #1e40af);
          min-width: 280px;
          animation: fade-in-left 0.5s ease-out;
        }

        .scoreboard-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--color-background, #f8fafc);
        }

        .trophy-icon {
          color: var(--color-secondary, #10b981);
        }

        .scoreboard-title {
          font-size: 1.25rem;
          font-weight: bold;
          color: var(--color-textPrimary, #1f2937);
          margin: 0;
        }

        .score-grid {
          display: grid;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .score-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          border-radius: 8px;
          background: var(--color-background, #f8fafc);
        }

        .score-item.player-x {
          border-left: 4px solid var(--color-xColor, #ef4444);
        }

        .score-item.player-o {
          border-left: 4px solid var(--color-oColor, #3b82f6);
        }

        .score-item.draws {
          border-left: 4px solid var(--color-textSecondary, #6b7280);
        }

        .score-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-textPrimary, #1f2937);
          font-weight: medium;
        }

        .player-symbol {
          font-weight: bold;
          font-size: 1.125rem;
        }

        .score-item.player-x .player-symbol {
          color: var(--color-xColor, #ef4444);
        }

        .score-item.player-o .player-symbol {
          color: var(--color-oColor, #3b82f6);
        }

        .score-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--color-textPrimary, #1f2937);
        }

        .score-value.score-updated {
          animation: scale-up 0.3s ease-out;
        }

        .scoreboard-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid var(--color-background, #f8fafc);
        }

        .total-games {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-textSecondary, #6b7280);
          font-size: 0.875rem;
        }

        .reset-button {
          background: none;
          border: 1px solid var(--color-primary, #1e40af);
          color: var(--color-primary, #1e40af);
          padding: 0.375rem 0.75rem;
          border-radius: 6px;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .reset-button:hover {
          background: var(--color-primary, #1e40af);
          color: white;
          transform: scale(1.05);
        }

        .reset-button:active {
          transform: scale(0.95);
        }

        .reset-button:focus {
          outline: 2px solid var(--color-secondary, #10b981);
          outline-offset: 2px;
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scale-up {
          from {
            transform: scale(1.2);
          }
          to {
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .scoreboard {
            padding: 1rem;
            min-width: 240px;
          }

          .scoreboard-footer {
            flex-direction: column;
            gap: 0.75rem;
            align-items: stretch;
          }

          .total-games {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default ScoreBoard;
