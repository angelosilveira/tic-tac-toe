import React, { useState, useEffect } from "react";
import { Trophy, Target, Users } from "lucide-react";
import "./ScoreBoard.styles.css";

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
    </div>
  );
};

export default ScoreBoard;
