import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import ColorMenu from "./ColorMenu";

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
};

const mockTheme = {
  primary: "#1e40af",
  secondary: "#10b981",
  background: "#f8fafc",
  boardBg: "#ffffff",
  xColor: "#ef4444",
  oColor: "#3b82f6",
  textPrimary: "#1f2937",
  textSecondary: "#6b7280",
};

const mockPresetThemes = {
  default: mockTheme,
  dark: { ...mockTheme },
  neon: { ...mockTheme },
  sunset: { ...mockTheme },
};

describe("ColorMenu", () => {
  const defaultProps = {
    isOpen: true,
    onToggle: jest.fn(),
    theme: mockTheme,
    onThemeChange: {
      selectPresetTheme: jest.fn(),
      updateColor: jest.fn(),
    },
    presetThemes: mockPresetThemes,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the color menu trigger button", () => {
    renderWithTheme(<ColorMenu {...defaultProps} />);

    const triggerButton = screen.getByLabelText("Menu de cores");
    expect(triggerButton).toBeInTheDocument();
  });

  test('shows preset themes when "Temas Prontos" tab is active', () => {
    renderWithTheme(<ColorMenu {...defaultProps} />);

    const presetTab = screen.getByText("Temas Prontos");
    expect(presetTab).toHaveClass("active");

    const themeNames = {
      default: "Padrão",
      dark: "Escuro",
      neon: "Neon",
      sunset: "Pôr do Sol",
    };

    Object.values(themeNames).forEach((label) => {
      const themeButton = screen.getByText(label);
      expect(themeButton).toBeInTheDocument();
    });
  });

  test("switches to custom colors tab when clicked", () => {
    renderWithTheme(<ColorMenu {...defaultProps} />);

    const customTab = screen.getByText("Personalizado");
    fireEvent.click(customTab);

    expect(customTab).toHaveClass("active");
    expect(screen.getByText("Cor Principal")).toBeInTheDocument();
    expect(screen.getByText("Cor Secundária")).toBeInTheDocument();
  });

  test("calls selectPresetTheme when a preset theme is selected", () => {
    renderWithTheme(<ColorMenu {...defaultProps} />);

    const defaultThemeButton = screen.getByText("Padrão");
    fireEvent.click(defaultThemeButton);

    expect(defaultProps.onThemeChange.selectPresetTheme).toHaveBeenCalledWith(
      "default"
    );
  });

  test("calls updateColor when a custom color is changed", () => {
    renderWithTheme(<ColorMenu {...defaultProps} />);

    const customTab = screen.getByText("Personalizado");
    fireEvent.click(customTab);

    const primaryColorInput = screen.getByLabelText("Cor Principal");
    fireEvent.change(primaryColorInput, { target: { value: "#ff0000" } });

    expect(defaultProps.onThemeChange.updateColor).toHaveBeenCalledWith(
      "primary",
      "#ff0000"
    );
  });

  test("closes menu when close button is clicked", () => {
    renderWithTheme(<ColorMenu {...defaultProps} />);

    const closeButton = screen.getByLabelText("Fechar menu");
    fireEvent.click(closeButton);

    expect(defaultProps.onToggle).toHaveBeenCalledTimes(1);
  });

  test("does not render menu content when isOpen is false", () => {
    renderWithTheme(<ColorMenu {...defaultProps} isOpen={false} />);

    const menu = screen.queryByText("Personalizar Cores");
    expect(menu).not.toBeInTheDocument();
  });
});
