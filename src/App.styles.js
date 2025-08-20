import styled from "styled-components";

export const GameWrapper = styled.div`
  min-height: 100vh;
  background: var(--color-background, #f8fafc);
  padding: 1rem;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-textPrimary, #1f2937);
  margin: 0 0 0.5rem 0;
  background: linear-gradient(
    135deg,
    var(--color-primary, #1e40af),
    var(--color-secondary, #10b981)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

export const Subtitle = styled.p`
  color: var(--color-textSecondary, #6b7280);
  margin: 0;
  font-size: 0.875rem;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const GameLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  gap: 2rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const CenterPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const BoardContainer = styled.div`
  position: relative;
`;

export const SidePanel = styled.div`
  @media (max-width: 1024px) {
    max-width: 400px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    max-width: none;
  }
`;

export const RightPanel = styled(SidePanel)`
  @media (max-width: 1024px) {
    order: -1;
  }
`;

export const GameInfo = styled.div`
  background: var(--color-boardBg, #ffffff);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--color-primary, #1e40af);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const InstructionsTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-textPrimary, #1f2937);
`;

export const InstructionsList = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
  color: var(--color-textSecondary, #6b7280);
`;

export const InstructionItem = styled.li`
  margin-bottom: 0.5rem;
  font-size: 0.875rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ThemeSwitcher = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const ThemeButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

export const ThemeButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  background: var(--color-boardBg);
  color: var(--color-textPrimary);
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.active {
    border-color: var(--color-primary);
    background: var(--color-primary);
    color: white;
  }

  &.default {
    background: #ffffff;
    color: #1f2937;
  }

  &.dark {
    background: #1f2937;
    color: #f9fafb;
  }

  &.neon {
    background: #1e293b;
    color: #f1f5f9;
  }

  &.sunset {
    background: #ffffff;
    color: #92400e;
  }

  @media (max-width: 480px) {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }
`;
