import React from "react";
import { Clock } from "lucide-react";
import "./Timer.styles.css";

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
    </div>
  );
};

export default Timer;
