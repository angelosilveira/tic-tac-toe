import styled, { keyframes, css } from "styled-components";

const scaleIn = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const pulseUrgent = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.6;
  }
`;

export const TimerContainer = styled.div`
  background: var(--color-boardBg, #ffffff);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--color-primary, #1e40af);
  min-width: 200px;
  animation: ${scaleIn} 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 0.75rem;
    min-width: 180px;
  }
`;

export const TimerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

export const TimerIcon = styled.div`
  color: var(--color-primary, #1e40af);
  flex-shrink: 0;
`;

export const TimerInfo = styled.div`
  flex: 1;
`;

export const PlayerTurn = styled.span`
  display: block;
  font-size: 0.875rem;
  color: var(--color-textSecondary, #6b7280);
  margin-bottom: 0.25rem;
`;

export const TimeDisplay = styled.div`
  display: flex;
  align-items: center;
`;

export const TimeNumber = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--color-textPrimary, #1f2937);
  transition: color 0.3s ease;

  ${(props) =>
    props.isLowTime &&
    css`
      color: #ef4444;
      animation: ${pulseUrgent} 0.5s infinite alternate;
    `}

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const TimerBar = styled.div`
  height: 4px;
  background: var(--color-background, #f8fafc);
  border-radius: 2px;
  overflow: hidden;
`;

export const TimerProgress = styled.div`
  height: 100%;
  background: ${(props) =>
    props.isUrgent ? "#ef4444" : "var(--color-secondary, #10b981)"};
  border-radius: 2px;
  transition: background-color 0.3s ease, width 0.3s linear;
  width: ${(props) => props.percentage}%;
`;
