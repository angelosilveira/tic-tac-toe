import React, { useState, useEffect } from "react";
import { Palette, X, Check } from "lucide-react";
import {
  ColorMenuTrigger,
  ColorMenuBackdrop,
  ColorMenuContainer,
  ColorMenuHeader,
  ColorMenuTitle,
  CloseButton,
  ColorMenuTabs,
  Tab,
  ColorMenuContent,
  PresetThemes,
  PresetThemeButton,
  ThemePreview,
  ColorDot,
  ThemeName,
  SelectedIcon,
  CustomColors,
  ColorInputGroup,
  ColorLabel,
  ColorInputWrapper,
  ColorInput,
  ColorPreview,
} from "./ColorMenu.styles";

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
      <ColorMenuTrigger onClick={onToggle} aria-label="Menu de cores">
        <Palette size={20} />
      </ColorMenuTrigger>

      <>
        <ColorMenuBackdrop
          className={isClosing ? "closing" : ""}
          onClick={onToggle}
        />
        <ColorMenuContainer className={isClosing ? "closing" : ""}>
          <ColorMenuHeader>
            <ColorMenuTitle>
              <Palette size={20} />
              <h3>Personalizar Cores</h3>
            </ColorMenuTitle>
            <CloseButton onClick={onToggle} aria-label="Fechar menu">
              <X size={20} />
            </CloseButton>
          </ColorMenuHeader>

          <ColorMenuTabs>
            <Tab
              className={activeTab === "presets" ? "active" : ""}
              onClick={() => setActiveTab("presets")}
            >
              Temas Prontos
            </Tab>
            <Tab
              className={activeTab === "custom" ? "active" : ""}
              onClick={() => setActiveTab("custom")}
            >
              Personalizado
            </Tab>
          </ColorMenuTabs>

          <ColorMenuContent>
            {activeTab === "presets" && (
              <PresetThemes>
                {Object.entries(presetThemes).map(([key, preset]) => (
                  <PresetThemeButton
                    key={key}
                    onClick={() => onThemeChange.selectPresetTheme(key)}
                  >
                    <ThemePreview>
                      <ColorDot color={preset.primary} />
                      <ColorDot color={preset.secondary} />
                      <ColorDot color={preset.xColor} />
                      <ColorDot color={preset.oColor} />
                    </ThemePreview>
                    <ThemeName>
                      {key === "default"
                        ? "Padrão"
                        : key === "dark"
                        ? "Escuro"
                        : key === "neon"
                        ? "Neon"
                        : key === "sunset"
                        ? "Pôr do Sol"
                        : key}
                    </ThemeName>
                    {JSON.stringify(theme) === JSON.stringify(preset) && (
                      <SelectedIcon>
                        <Check size={16} />
                      </SelectedIcon>
                    )}
                  </PresetThemeButton>
                ))}
              </PresetThemes>
            )}

            {activeTab === "custom" && (
              <CustomColors>
                {Object.entries(colorLabels).map(([key, label]) => (
                  <ColorInputGroup key={key}>
                    <ColorLabel htmlFor={`color-${key}`}>{label}</ColorLabel>
                    <ColorInputWrapper>
                      <ColorInput
                        id={`color-${key}`}
                        type="color"
                        value={theme[key]}
                        onChange={(e) =>
                          onThemeChange.updateColor(key, e.target.value)
                        }
                      />
                      <ColorPreview color={theme[key]} />
                    </ColorInputWrapper>
                  </ColorInputGroup>
                ))}
              </CustomColors>
            )}
          </ColorMenuContent>
        </ColorMenuContainer>
      </>
    </>
  );
};

export default ColorMenu;
