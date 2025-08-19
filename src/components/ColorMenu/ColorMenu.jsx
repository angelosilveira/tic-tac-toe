import React, { useState, useEffect } from "react";
import { Palette, X, Check } from "lucide-react";

const ColorMenu = ({
  isOpen,
  onToggle,
  theme,
  onThemeChange,
  presetThemes,
}) => {
  const [activeTab, setActiveTab] = useState("presets");
  const [isRendered, setIsRendered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setIsRendered(true);
    } else if (isRendered) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered]);

  const colorLabels = {
    primary: "Cor Principal",
    secondary: "Cor Secundária",
    background: "Fundo",
    boardBg: "Fundo do Tabuleiro",
    xColor: "Cor do X",
    oColor: "Cor do O",
    textPrimary: "Texto Principal",
    textSecondary: "Texto Secundário",
  };

  if (!isRendered) return null;

  return (
    <>
      <button
        className="color-menu-trigger"
        onClick={onToggle}
        aria-label="Menu de cores"
      >
        <Palette size={20} />
      </button>

      <>
        <div
          className={`color-menu-backdrop ${isClosing ? "closing" : ""}`}
          onClick={onToggle}
        />
        <div className={`color-menu ${isClosing ? "closing" : ""}`}>
          <div className="color-menu-header">
            <div className="color-menu-title">
              <Palette size={20} />
              <h3>Personalizar Cores</h3>
            </div>
            <button
              className="close-button"
              onClick={onToggle}
              aria-label="Fechar menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="color-menu-tabs">
            <button
              className={`tab ${activeTab === "presets" ? "active" : ""}`}
              onClick={() => setActiveTab("presets")}
            >
              Temas Prontos
            </button>
            <button
              className={`tab ${activeTab === "custom" ? "active" : ""}`}
              onClick={() => setActiveTab("custom")}
            >
              Personalizado
            </button>
          </div>

          <div className="color-menu-content">
            {activeTab === "presets" && (
              <div className="preset-themes">
                {Object.entries(presetThemes).map(([key, preset]) => (
                  <button
                    key={key}
                    className="preset-theme"
                    onClick={() => onThemeChange.selectPresetTheme(key)}
                  >
                    <div className="theme-preview">
                      <div
                        className="color-dot"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div
                        className="color-dot"
                        style={{ backgroundColor: preset.secondary }}
                      />
                      <div
                        className="color-dot"
                        style={{ backgroundColor: preset.xColor }}
                      />
                      <div
                        className="color-dot"
                        style={{ backgroundColor: preset.oColor }}
                      />
                    </div>
                    <span className="theme-name">
                      {key === "default"
                        ? "Padrão"
                        : key === "dark"
                        ? "Escuro"
                        : key === "neon"
                        ? "Neon"
                        : key === "sunset"
                        ? "Pôr do Sol"
                        : key}
                    </span>
                    {JSON.stringify(theme) === JSON.stringify(preset) && (
                      <Check size={16} className="selected-icon" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {activeTab === "custom" && (
              <div className="custom-colors">
                {Object.entries(colorLabels).map(([key, label]) => (
                  <div key={key} className="color-input-group">
                    <label htmlFor={`color-${key}`} className="color-label">
                      {label}
                    </label>
                    <div className="color-input-wrapper">
                      <input
                        id={`color-${key}`}
                        type="color"
                        value={theme[key]}
                        onChange={(e) =>
                          onThemeChange.updateColor(key, e.target.value)
                        }
                        className="color-input"
                      />
                      <div
                        className="color-preview"
                        style={{ backgroundColor: theme[key] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default ColorMenu;
