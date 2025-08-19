import React from "react";
import { Trophy, Users, RotateCcw } from "lucide-react";
import "./GameStatus.styles.css";

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
    </div>
  );
};

export default GameStatus;
