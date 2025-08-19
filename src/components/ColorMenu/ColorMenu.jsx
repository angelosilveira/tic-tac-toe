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
      }, 300); // Animation duration
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

      <style jsx>{`
        .color-menu-trigger {
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
        }

        .color-menu-trigger:hover {
          transform: scale(1.05);
        }
        .color-menu-trigger:active {
          transform: scale(0.95);
        }

        .color-menu-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1001;
          animation: fade-in 0.3s ease-out;
        }

        .color-menu-backdrop.closing {
          animation: fade-out 0.3s ease-in forwards;
        }

        .color-menu {
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
          animation: slide-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .color-menu.closing {
          animation: slide-out 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045)
            forwards;
        }

        .color-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--color-background, #f8fafc);
        }

        .color-menu-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .color-menu-title h3 {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-textPrimary, #1f2937);
        }

        .close-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          color: var(--color-textSecondary, #6b7280);
          transition: background-color 0.2s ease;
        }

        .close-button:hover {
          background: var(--color-background, #f8fafc);
        }

        .color-menu-tabs {
          display: flex;
          background: var(--color-background, #f8fafc);
          padding: 0.25rem;
          margin: 0 1.5rem;
          border-radius: 8px;
        }

        .tab {
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
        }

        .tab.active {
          background: var(--color-boardBg, #ffffff);
          color: var(--color-textPrimary, #1f2937);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .color-menu-content {
          padding: 1.5rem;
          max-height: 60vh;
          overflow-y: auto;
        }

        .preset-themes {
          display: grid;
          gap: 0.75rem;
        }

        .preset-theme {
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
        }

        .preset-theme:hover {
          border-color: var(--color-primary, #1e40af);
          transform: scale(1.02);
        }

        .preset-theme:active {
          transform: scale(0.98);
        }

        .theme-preview {
          display: flex;
          gap: 0.25rem;
        }

        .color-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .theme-name {
          flex: 1;
          font-weight: 500;
          color: var(--color-textPrimary, #1f2937);
        }

        .selected-icon {
          color: var(--color-secondary, #10b981);
        }

        .custom-colors {
          display: grid;
          gap: 1rem;
        }

        .color-input-group {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .color-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-textPrimary, #1f2937);
        }

        .color-input-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .color-input {
          width: 40px;
          height: 32px;
          border: 1px solid var(--color-background, #f8fafc);
          border-radius: 6px;
          cursor: pointer;
        }

        .color-preview {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes slide-in {
          from {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
        @keyframes slide-out {
          from {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          to {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default ColorMenu;
