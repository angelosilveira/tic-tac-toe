import { useState, useEffect, useCallback } from "react";

export const useTimer = (duration = 5, onTimeUp) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  const startTimer = useCallback(() => {
    setTimeLeft(duration);
    setIsActive(true);
  }, [duration]);

  const stopTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(duration);
  }, [duration]);

  const resetTimer = useCallback(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            onTimeUp && onTimeUp();
            return duration;
          }
          return time - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, onTimeUp, duration]);

  return {
    timeLeft,
    isActive,
    startTimer,
    stopTimer,
    resetTimer,
  };
};
