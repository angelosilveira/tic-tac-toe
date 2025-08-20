import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  to {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
  }
`;

export const ColorMenuTrigger = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: var(--color-primary, #1e40af);
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ColorMenuBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  animation: ${fadeIn} 0.3s ease-out;

  &.closing {
    animation: ${fadeOut} 0.3s ease-in forwards;
  }
`;

export const ColorMenuContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  background: var(--color-boardBg, #ffffff);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  z-index: 1002;
  width: 90vw;
  max-width: 400px;
  max-height: 80vh;
  overflow: hidden;
  animation: ${slideIn} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &.closing {
    animation: ${slideOut} 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;
  }
`;

export const ColorMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-background, #f8fafc);
`;

export const ColorMenuTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-textPrimary, #1f2937);
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  color: var(--color-textSecondary, #6b7280);
  transition: background-color 0.2s ease;

  &:hover {
    background: var(--color-background, #f8fafc);
  }
`;

export const ColorMenuTabs = styled.div`
  display: flex;
  background: var(--color-background, #f8fafc);
  padding: 0.25rem;
  margin: 0 1.5rem;
  border-radius: 8px;
`;

export const Tab = styled.button`
  flex: 1;
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--color-textSecondary, #6b7280);

  &.active {
    background: var(--color-boardBg, #ffffff);
    color: var(--color-textPrimary, #1f2937);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
`;

export const ColorMenuContent = styled.div`
  padding: 1.5rem;
  max-height: 60vh;
  overflow-y: auto;
`;

export const PresetThemes = styled.div`
  display: grid;
  gap: 0.75rem;
`;

export const PresetThemeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--color-background, #f8fafc);
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;

  &:hover {
    border-color: var(--color-primary, #1e40af);
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ThemePreview = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const ColorDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.color};
`;

export const ThemeName = styled.span`
  flex: 1;
  font-weight: 500;
  color: var(--color-textPrimary, #1f2937);
`;

export const SelectedIcon = styled.div`
  color: var(--color-secondary, #10b981);
`;

export const CustomColors = styled.div`
  display: grid;
  gap: 1rem;
`;

export const ColorInputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ColorLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-textPrimary, #1f2937);
`;

export const ColorInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ColorInput = styled.input`
  width: 40px;
  height: 32px;
  border: 1px solid var(--color-background, #f8fafc);
  border-radius: 6px;
  cursor: pointer;
`;

export const ColorPreview = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.color};
`;
