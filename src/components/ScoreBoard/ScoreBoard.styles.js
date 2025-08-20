import styled, { keyframes, css } from "styled-components";

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleUp = keyframes`
  from {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
`;

export const ScoreBoardContainer = styled.div`
  background: var(--color-boardBg, #ffffff);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--color-primary, #1e40af);
  min-width: 280px;
  animation: ${fadeInLeft} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 1rem;
    min-width: 240px;
  }
`;

export const ScoreBoardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-background, #f8fafc);
`;

export const TrophyIcon = styled.div`
  color: var(--color-secondary, #10b981);
`;

export const ScoreBoardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--color-textPrimary, #1f2937);
  margin: 0;
`;

export const ScoreGrid = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const ScoreItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-radius: 8px;
  background: var(--color-background, #f8fafc);
  border-left: 4px solid
    ${(props) => {
      if (props.playerType === "x") return "var(--color-xColor, #ef4444)";
      if (props.playerType === "o") return "var(--color-oColor, #3b82f6)";
      return "var(--color-textSecondary, #6b7280)";
    }};
`;

export const ScoreLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-textPrimary, #1f2937);
  font-weight: medium;
`;

export const PlayerSymbol = styled.span`
  font-weight: bold;
  font-size: 1.125rem;
  color: ${(props) =>
    props.player === "x"
      ? "var(--color-xColor, #ef4444)"
      : props.player === "o"
      ? "var(--color-oColor, #3b82f6)"
      : "inherit"};
`;

export const ScoreValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-textPrimary, #1f2937);
  animation: ${(props) =>
    props.updated
      ? css`
          ${scaleUp} 0.3s ease-out
        `
      : "none"};
`;

export const ScoreBoardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-background, #f8fafc);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }
`;

export const TotalGames = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-textSecondary, #6b7280);
  font-size: 0.875rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const ResetButton = styled.button`
  background: none;
  border: 1px solid var(--color-primary, #1e40af);
  color: var(--color-primary, #1e40af);
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-primary, #1e40af);
    color: white;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: 2px solid var(--color-secondary, #10b981);
    outline-offset: 2px;
  }
`;
