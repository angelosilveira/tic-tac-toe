import React, { useState, useEffect } from "react";
import { useGameLogic } from "./hooks/useGameLogic";
import { useTimer } from "./hooks/useTimer";
import { useColorTheme } from "./hooks/useColorTheme";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./App.css";

import ColorMenu from "./components/ColorMenu";
import GameBoard from "./components/GameBoard";
import Timer from "./components/Timer";
import ScoreBoard from "./components/ScoreBoard";
import GameStatus from "./components/GameStatus";

import "./App.css";

export default function App() {
  const [scores, setScores] = useState({
    playerXScore: 0,
    playerOScore: 0,
    draws: 0,
  });
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);

  const {
    board,
    currentPlayer,
    gameStatus,
    winner,
    winningLine,
    makeMove,
    resetGame,
    autoMove,
  } = useGameLogic();

  const { currentTheme, presetThemes, selectPresetTheme, updateColor } =
    useColorTheme();

  const { timeLeft, isActive, startTimer, stopTimer, resetTimer } = useTimer(
    5,
    autoMove
  );

  useEffect(() => {
    if (gameStatus === "playing") {
      startTimer();
    } else {
      stopTimer();
    }
  }, [gameStatus, currentPlayer, startTimer, stopTimer]);

  useEffect(() => {
    if (gameStatus === "playing") {
      resetTimer();
      startTimer();
    }
  }, [currentPlayer, gameStatus, resetTimer, startTimer]);

  const handleSquareClick = (index) => {
    const success = makeMove(index);
    if (success && gameStatus === "playing") {
      resetTimer();
      startTimer();
    }
  };

  const handleNewGame = () => {
    resetGame();
    resetTimer();
  };

  useEffect(() => {
    const savedScores = useLocalStorage.loadScores();
    setScores(savedScores);
  }, []);

  const handleUpdateScore = (result) => {
    let newScores = { ...scores };

    if (result === "X") {
      newScores.playerXScore += 1;
    } else if (result === "O") {
      newScores.playerOScore += 1;
    } else if (result === "draw") {
      newScores.draws += 1;
    }

    setScores(newScores);
    useLocalStorage.saveScores(newScores);
  };

  const handleResetScores = () => {
    const newScores = { playerXScore: 0, playerOScore: 0, draws: 0 };
    setScores(newScores);
    useLocalStorage.resetScores();
  };

  useEffect(() => {
    selectPresetTheme("default");
  }, []);

  return (
    <div className="tic-tac-toe-game">
      <div className="game-container">
        <header className="game-header">
          <h1 className="game-title">Jogo da Velha</h1>
        </header>

        <div className="theme-switcher">
          <div className="theme-buttons">
            <button
              className={`theme-button default ${
                currentTheme === presetThemes.default ? "active" : ""
              }`}
              onClick={() => selectPresetTheme("default")}
            >
              Padrão
            </button>
            <button
              className={`theme-button dark ${
                currentTheme === presetThemes.dark ? "active" : ""
              }`}
              onClick={() => selectPresetTheme("dark")}
            >
              Escuro
            </button>
            <button
              className={`theme-button neon ${
                currentTheme === presetThemes.neon ? "active" : ""
              }`}
              onClick={() => selectPresetTheme("neon")}
            >
              Neon
            </button>
            <button
              className={`theme-button sunset ${
                currentTheme === presetThemes.sunset ? "active" : ""
              }`}
              onClick={() => selectPresetTheme("sunset")}
            >
              Pôr do Sol
            </button>
          </div>
        </div>

        <div className="game-layout">
          <div className="left-panel">
            <ScoreBoard scores={scores} onReset={handleResetScores} />
          </div>

          <div className="center-panel">
            <div className="game-area">
              {gameStatus === "playing" && (
                <Timer
                  timeLeft={timeLeft}
                  isActive={isActive}
                  currentPlayer={currentPlayer}
                />
              )}

              <div className="board-container">
                <GameBoard
                  board={board}
                  onSquareClick={handleSquareClick}
                  winningLine={winningLine}
                  disabled={gameStatus !== "playing"}
                  theme={currentTheme}
                />

                {gameStatus !== "playing" && (
                  <GameStatus
                    gameStatus={gameStatus}
                    winner={winner}
                    currentPlayer={currentPlayer}
                    onNewGame={handleNewGame}
                    onUpdateScore={handleUpdateScore}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="right-panel">
            <div className="game-info">
              <div className="instructions">
                <h3>Como Jogar</h3>
                <ul>
                  <li>Clique em uma célula ou use as teclas 1-9</li>
                  <li>Você tem 5 segundos por jogada</li>
                  <li>Forme uma linha para vencer</li>
                  <li>Pressione R para reiniciar</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ColorMenu
        isOpen={isColorMenuOpen}
        onToggle={() => setIsColorMenuOpen(!isColorMenuOpen)}
        theme={currentTheme}
        onThemeChange={{ selectPresetTheme, updateColor }}
        presetThemes={presetThemes}
      />
    </div>
  );
}
