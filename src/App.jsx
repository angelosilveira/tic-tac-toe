import React, { useState, useEffect } from "react";
import { useGameLogic } from "./hooks/useGameLogic";
import { useTimer } from "./hooks/useTimer";
import { useColorTheme } from "./hooks/useColorTheme";
import { useLocalStorage } from "./hooks/useLocalStorage";

import ColorMenu from "./components/ColorMenu";
import GameBoard from "./components/GameBoard";
import Timer from "./components/Timer";
import ScoreBoard from "./components/ScoreBoard";
import GameStatus from "./components/GameStatus";

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

  // Gerenciar timer baseado no estado do jogo
  useEffect(() => {
    if (gameStatus === "playing") {
      startTimer();
    } else {
      stopTimer();
    }
  }, [gameStatus, currentPlayer, startTimer, stopTimer]);

  // Reset timer quando jogador faz movimento
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

  // Replace the database loading effect with:
  useEffect(() => {
    const savedScores = useLocalStorage.loadScores();
    setScores(savedScores);
  }, []);

  // Replace handleUpdateScore with:
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

  // Replace handleResetScores with:
  const handleResetScores = () => {
    const newScores = { playerXScore: 0, playerOScore: 0, draws: 0 };
    setScores(newScores);
    useLocalStorage.resetScores();
  };

  // Aplicar tema inicial
  useEffect(() => {
    selectPresetTheme("default");
  }, []);

  // Adicionar event listeners para navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStatus !== "playing") return;

      const keyToIndex = {
        1: 0,
        2: 1,
        3: 2,
        4: 3,
        5: 4,
        6: 5,
        7: 6,
        8: 7,
        9: 8,
      };

      const index = keyToIndex[e.key];
      if (index !== undefined && !board[index]) {
        handleSquareClick(index);
      }

      if (e.key === "r" || e.key === "R") {
        handleNewGame();
      }

      if (e.key === "c" || e.key === "C") {
        setIsColorMenuOpen(!isColorMenuOpen);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStatus, board, isColorMenuOpen]);

  return (
    <div className="tic-tac-toe-game">
      <div className="game-container">
        <header className="game-header">
          <h1 className="game-title">Jogo da Velha</h1>
          <p className="game-subtitle">
            Use o teclado (1-9) para jogar • R para reiniciar • C para cores
          </p>
        </header>

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

      <style jsx>{`
        .tic-tac-toe-game {
          min-height: 100vh;
          background: var(--color-background, #f8fafc);
          padding: 1rem;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .game-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .game-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .game-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--color-textPrimary, #1f2937);
          margin: 0 0 0.5rem 0;
          background: linear-gradient(
            135deg,
            var(--color-primary, #1e40af),
            var(--color-secondary, #10b981)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .game-subtitle {
          color: var(--color-textSecondary, #6b7280);
          margin: 0;
          font-size: 0.875rem;
        }

        .game-layout {
          display: grid;
          grid-template-columns: 300px 1fr 300px;
          gap: 2rem;
          align-items: start;
        }

        .center-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .game-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .board-container {
          position: relative;
        }

        .game-info {
          background: var(--color-boardBg, #ffffff);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 2px solid var(--color-primary, #1e40af);
        }

        .instructions h3 {
          margin: 0 0 1rem 0;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-textPrimary, #1f2937);
        }

        .instructions ul {
          margin: 0;
          padding-left: 1.25rem;
          color: var(--color-textSecondary, #6b7280);
        }

        .instructions li {
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .instructions li:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 1024px) {
          .game-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .left-panel,
          .right-panel {
            max-width: 400px;
            margin: 0 auto;
          }

          .right-panel {
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .tic-tac-toe-game {
            padding: 0.5rem;
          }

          .game-title {
            font-size: 2rem;
          }

          .game-layout {
            gap: 1rem;
          }

          .left-panel,
          .right-panel {
            max-width: none;
          }

          .game-info {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .game-title {
            font-size: 1.75rem;
          }

          .game-subtitle {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
