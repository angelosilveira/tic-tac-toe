import React from "react";
import { Trophy, Users, RotateCcw } from "lucide-react";
import {
  GameStatusContainer,
  StatusContent,
  Announcement,
  TrophyIcon,
  DrawIcon,
  StatusTitle,
  StatusMessage,
  NewGameButton,
} from "./GameStatus.styles";

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
    <GameStatusContainer>
      <StatusContent>
        {gameStatus === "won" ? (
          <Announcement>
            <TrophyIcon>
              <Trophy size={32} />
            </TrophyIcon>
            <StatusTitle>Jogador {winner} Venceu!</StatusTitle>
            <StatusMessage>Parabéns pela vitória!</StatusMessage>
          </Announcement>
        ) : (
          <Announcement>
            <DrawIcon>
              <Users size={32} />
            </DrawIcon>
            <StatusTitle>Empate!</StatusTitle>
            <StatusMessage>Que jogo equilibrado!</StatusMessage>
          </Announcement>
        )}

        <NewGameButton onClick={handleNewGame}>
          <RotateCcw size={20} />
          Novo Jogo
        </NewGameButton>
      </StatusContent>
    </GameStatusContainer>
  );
};

export default GameStatus;
