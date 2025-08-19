import { useState } from "react";

const DEFAULT_THEME = {
  primary: "#1e40af",
  secondary: "#10b981",
  background: "#f8fafc",
  boardBg: "#ffffff",
  xColor: "#ef4444",
  oColor: "#3b82f6",
  textPrimary: "#1f2937",
  textSecondary: "#6b7280",
};

const PRESET_THEMES = {
  default: DEFAULT_THEME,
  dark: {
    primary: "#6366f1",
    secondary: "#10b981",
    background: "#111827",
    boardBg: "#1f2937",
    xColor: "#f87171",
    oColor: "#60a5fa",
    textPrimary: "#f9fafb",
    textSecondary: "#d1d5db",
  },
  neon: {
    primary: "#a855f7",
    secondary: "#06b6d4",
    background: "#0f172a",
    boardBg: "#1e293b",
    xColor: "#f472b6",
    oColor: "#34d399",
    textPrimary: "#f1f5f9",
    textSecondary: "#cbd5e1",
  },
  sunset: {
    primary: "#f97316",
    secondary: "#dc2626",
    background: "#fef7cd",
    boardBg: "#ffffff",
    xColor: "#dc2626",
    oColor: "#f97316",
    textPrimary: "#92400e",
    textSecondary: "#d97706",
  },
};

export const useColorTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(DEFAULT_THEME);

  const applyTheme = (theme) => {
    setCurrentTheme(theme);

    // Aplicar CSS custom properties
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
  };

  const selectPresetTheme = (themeName) => {
    if (PRESET_THEMES[themeName]) {
      applyTheme(PRESET_THEMES[themeName]);
    }
  };

  const updateColor = (colorKey, colorValue) => {
    const newTheme = { ...currentTheme, [colorKey]: colorValue };
    applyTheme(newTheme);
  };

  return {
    currentTheme,
    presetThemes: PRESET_THEMES,
    selectPresetTheme,
    updateColor,
    applyTheme,
  };
};
