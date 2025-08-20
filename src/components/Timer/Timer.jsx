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
          <Clock size={20} data-testid="timer-clock-icon" />
        </TimerIcon>
        <TimerInfo>
          <PlayerTurn>Vez do jogador {currentPlayer}</PlayerTurn>
          <TimeDisplay>
            <TimeNumber isLowTime={isLowTime}>{timeLeft}s</TimeNumber>
          </TimeDisplay>
        </TimerInfo>
      </TimerContent>

      <TimerBar>
        <TimerProgress
          data-testid="timer-progress"
          isUrgent={isLowTime}
          style={{ width: `${percentage}%` }}
        />
      </TimerBar>
    </TimerContainer>
  );
};

export default Timer;
