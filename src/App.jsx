import React, { useState, useEffect } from "react";
import { useGameLogic } from "./hooks/useGameLogic";
import { useTimer } from "./hooks/useTimer";
import { useColorTheme } from "./hooks/useColorTheme";
import { useLocalStorage } from "./hooks/useLocalStorage";
import GameBoard from "./components/GameBoard";
import Timer from "./components/Timer";
import ScoreBoard from "./components/ScoreBoard";
import GameStatus from "./components/GameStatus";

import {
  GameWrapper,
  GameContainer,
  Header,
  Title,
  GameLayout,
  CenterPanel,
  GameArea,
  BoardContainer,
  SidePanel,
  RightPanel,
  GameInfo,
  InstructionsTitle,
  InstructionsList,
  InstructionItem,
  ThemeSwitcher,
  ThemeButtons,
  ThemeButton,
} from "./App.styles";

export default function App() {
  const [scores, setScores] = useState({
    playerXScore: 0,
    playerOScore: 0,
    draws: 0,
  });

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

  const { currentTheme, presetThemes, selectPresetTheme } = useColorTheme();

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
    <GameWrapper>
      <GameContainer>
        <Header>
          <Title>Jogo da Velha</Title>
        </Header>

        <ThemeSwitcher>
          <ThemeButtons>
            <ThemeButton
              className={`default ${
                currentTheme === presetThemes.default ? "active" : ""
              }`}
              onClick={() => selectPresetTheme("default")}
            >
              Padrão
            </ThemeButton>
            <ThemeButton
              className={`dark ${
                currentTheme === presetThemes.dark ? "active" : ""
              }`}
              onClick={() => selectPresetTheme("dark")}
            >
              Escuro
            </ThemeButton>
            <ThemeButton
              className={`neon ${
                currentTheme === presetThemes.neon ? "active" : ""
              }`}
              onClick={() => selectPresetTheme("neon")}
            >
              Neon
            </ThemeButton>
            <ThemeButton
              className={`sunset ${
                currentTheme === presetThemes.sunset ? "active" : ""
              }`}
              onClick={() => selectPresetTheme("sunset")}
            >
              Pôr do Sol
            </ThemeButton>
          </ThemeButtons>
        </ThemeSwitcher>

        <GameLayout>
          <SidePanel>
            <ScoreBoard scores={scores} onReset={handleResetScores} />
          </SidePanel>

          <CenterPanel>
            <GameArea>
              {gameStatus === "playing" && (
                <Timer
                  timeLeft={timeLeft}
                  isActive={isActive}
                  currentPlayer={currentPlayer}
                />
              )}

              <BoardContainer>
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
              </BoardContainer>
            </GameArea>
          </CenterPanel>

          <RightPanel>
            <GameInfo>
              <div>
                <InstructionsTitle>Como Jogar</InstructionsTitle>
                <InstructionsList>
                  <InstructionItem>
                    Você tem 5 segundos por jogada
                  </InstructionItem>
                  <InstructionItem>Forme uma linha para vencer</InstructionItem>
                  <InstructionItem>Pressione R para reiniciar</InstructionItem>
                </InstructionsList>
              </div>
            </GameInfo>
          </RightPanel>
        </GameLayout>
      </GameContainer>
    </GameWrapper>
  );
}
