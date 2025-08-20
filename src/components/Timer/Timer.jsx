import React from "react";
import { Clock } from "lucide-react";
import {
  TimerContainer,
  TimerContent,
  TimerIcon,
  TimerInfo,
  PlayerTurn,
  TimeDisplay,
  TimeNumber,
  TimerBar,
  TimerProgress,
} from "./Timer.styles";

const Timer = ({ timeLeft, currentPlayer }) => {
  const percentage = (timeLeft / 5) * 100;
  const isLowTime = timeLeft <= 2;

  return (
    <TimerContainer>
      <TimerContent>
        <TimerIcon>
          <Clock size={20} />
        </TimerIcon>
        <TimerInfo>
          <PlayerTurn>Vez do jogador {currentPlayer}</PlayerTurn>
          <TimeDisplay>
            <TimeNumber isLowTime={isLowTime}>{timeLeft}s</TimeNumber>
          </TimeDisplay>
        </TimerInfo>
      </TimerContent>

      <TimerBar>
        <TimerProgress isUrgent={isLowTime} percentage={percentage} />
      </TimerBar>
    </TimerContainer>
  );
};

export default Timer;
