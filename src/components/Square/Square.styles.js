import styled, { keyframes, css } from "styled-components";

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const SquareButton = styled.button`
  width: 100%;
  height: 100px;
  border: none;
  background: var(--color-primary, #6366f1);
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  max-width: 96px;

  &:hover:not(:disabled) {
    transform: scale(1.05);
    background: var(--color-primary-dark, #4f46e5);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  ${(props) =>
    props.isWinning &&
    css`
      animation: ${pulse} 1s infinite;
      background: var(--color-success, #22c55e);
    `}

  @media (max-width: 768px) {
    height: 85px;
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    height: 75px;
    font-size: 1.75rem;
  }
`;

export const Mark = styled.span`
  color: ${(props) =>
    props.value === "X"
      ? "var(--color-xColor, #ef4444)"
      : "var(--color-oColor, #3b82f6)"};
`;
