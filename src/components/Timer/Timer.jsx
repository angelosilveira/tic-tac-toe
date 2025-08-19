import React from "react";
import { Clock } from "lucide-react";

const Timer = ({ timeLeft, currentPlayer }) => {
  const percentage = (timeLeft / 5) * 100;
  const isLowTime = timeLeft <= 2;

  return (
    <div className="timer-container">
      <div className="timer-content">
        <Clock className="timer-icon" size={20} />
        <div className="timer-info">
          <span className="player-turn">Vez do jogador {currentPlayer}</span>
          <div className="time-display">
            <span className={`time-number ${isLowTime ? "low-time" : ""}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
      </div>

      <div className="timer-bar">
        <div
          className={`timer-progress ${isLowTime ? "urgent" : ""}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <style jsx>{`
        .timer-container {
          background: var(--color-boardBg, #ffffff);
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border: 2px solid var(--color-primary, #1e40af);
          min-width: 200px;
          animation: scale-in 0.3s ease-out;
        }

        .timer-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .timer-icon {
          color: var(--color-primary, #1e40af);
          flex-shrink: 0;
        }

        .timer-info {
          flex: 1;
        }

        .player-turn {
          display: block;
          font-size: 0.875rem;
          color: var(--color-textSecondary, #6b7280);
          margin-bottom: 0.25rem;
        }

        .time-display {
          display: flex;
          align-items: center;
        }

        .time-number {
          font-size: 1.25rem;
          font-weight: bold;
          color: var(--color-textPrimary, #1f2937);
          transition: color 0.3s ease;
        }

        .time-number.low-time {
          color: #ef4444;
          animation: pulse-urgent 0.5s infinite alternate;
        }

        .timer-bar {
          height: 4px;
          background: var(--color-background, #f8fafc);
          border-radius: 2px;
          overflow: hidden;
        }

        .timer-progress {
          height: 100%;
          background: var(--color-secondary, #10b981);
          border-radius: 2px;
          transition: background-color 0.3s ease, width 0.3s linear;
        }

        .timer-progress.urgent {
          background: #ef4444;
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

        @keyframes pulse-urgent {
          from {
            opacity: 1;
          }
          to {
            opacity: 0.6;
          }
        }

        @media (max-width: 768px) {
          .timer-container {
            padding: 0.75rem;
            min-width: 180px;
          }

          .time-number {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Timer;
