import React, { useState, useEffect } from "react";
import { Trophy, Target, Users } from "lucide-react";
import {
  ScoreBoardContainer,
  ScoreBoardHeader,
  TrophyIcon,
  ScoreBoardTitle,
  ScoreGrid,
  ScoreItem,
  ScoreLabel,
  PlayerSymbol,
  ScoreValue,
  ScoreBoardFooter,
  TotalGames,
  ResetButton,
} from "./ScoreBoard.styles";

const ScoreBoard = ({ scores, onReset }) => {
  const { playerXScore = 0, playerOScore = 0, draws = 0 } = scores;
  const totalGames = playerXScore + playerOScore + draws;

  const [animateX, setAnimateX] = useState(false);
  const [animateO, setAnimateO] = useState(false);
  const [animateDraw, setAnimateDraw] = useState(false);

  useEffect(() => {
    if (playerXScore > 0) {
      setAnimateX(true);
      const timer = setTimeout(() => setAnimateX(false), 300);
      return () => clearTimeout(timer);
    }
  }, [playerXScore]);

  useEffect(() => {
    if (playerOScore > 0) {
      setAnimateO(true);
      const timer = setTimeout(() => setAnimateO(false), 300);
      return () => clearTimeout(timer);
    }
  }, [playerOScore]);

  useEffect(() => {
    if (draws > 0) {
      setAnimateDraw(true);
      const timer = setTimeout(() => setAnimateDraw(false), 300);
      return () => clearTimeout(timer);
    }
  }, [draws]);

  return (
    <ScoreBoardContainer>
      <ScoreBoardHeader>
        <TrophyIcon>
          <Trophy size={24} />
        </TrophyIcon>
        <ScoreBoardTitle>Placar</ScoreBoardTitle>
      </ScoreBoardHeader>

      <ScoreGrid>
        <ScoreItem playerType="x">
          <ScoreLabel>
            <PlayerSymbol player="x">X</PlayerSymbol>
            <span>Jogador X</span>
          </ScoreLabel>
          <ScoreValue updated={animateX ? true : undefined} key={playerXScore}>
            {playerXScore}
          </ScoreValue>
        </ScoreItem>

        <ScoreItem playerType="o">
          <ScoreLabel>
            <PlayerSymbol player="o">O</PlayerSymbol>
            <span>Jogador O</span>
          </ScoreLabel>
          <ScoreValue updated={animateO ? true : undefined} key={playerOScore}>
            {playerOScore}
          </ScoreValue>
        </ScoreItem>

        <ScoreItem>
          <ScoreLabel>
            <Users size={16} />
            <span>Empates</span>
          </ScoreLabel>
          <ScoreValue updated={animateDraw ? true : undefined} key={draws}>
            {draws}
          </ScoreValue>
        </ScoreItem>
      </ScoreGrid>

      <ScoreBoardFooter>
        <TotalGames>
          <Target size={16} />
          <span>Total: {totalGames} jogos</span>
        </TotalGames>

        {totalGames > 0 && (
          <ResetButton onClick={onReset} aria-label="Resetar placar">
            Resetar Placar
          </ResetButton>
        )}
      </ScoreBoardFooter>
    </ScoreBoardContainer>
  );
};

export default ScoreBoard;
