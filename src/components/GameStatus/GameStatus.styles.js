import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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

export const GameStatusContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  border-radius: 16px;
  animation: ${fadeIn} 0.3s ease;
`;

export const StatusContent = styled.div`
  background: var(--color-boardBg, #ffffff);
  padding: 1rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  max-width: 300px;
  width: 90%;
  animation: ${scaleIn} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

export const Announcement = styled.div`
  margin-bottom: 1.5rem;
`;

export const TrophyIcon = styled.div`
  color: var(--color-secondary, #10b981);
  margin-bottom: 0.75rem;
`;

export const DrawIcon = styled.div`
  color: var(--color-textSecondary, #6b7280);
  margin-bottom: 0.75rem;
`;

export const StatusTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-textPrimary, #1f2937);
  margin: 0 0 0.5rem 0;
`;

export const StatusMessage = styled.p`
  color: var(--color-textSecondary, #6b7280);
  margin: 0;
`;

export const NewGameButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--color-primary, #1e40af);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: var(--color-secondary, #10b981);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: 3px solid var(--color-secondary, #10b981);
    outline-offset: 2px;
  }
`;
