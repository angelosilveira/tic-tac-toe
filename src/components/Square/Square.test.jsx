/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import "jest-styled-components";
import { ThemeProvider } from "styled-components";
import Square from "./Square";

const mockTheme = {
  primary: "#1e40af",
  secondary: "#10b981",
  background: "#f8fafc",
  boardBg: "#ffffff",
  xColor: "#ef4444",
  oColor: "#3b82f6",
  success: "#22c55e",
};

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
};

describe("Square", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders empty square correctly", () => {
    renderWithTheme(<Square value="" onClick={mockOnClick} index={0} />);

    const square = screen.getByRole("button");
    expect(square).toHaveAttribute("aria-label", "Quadrado 1, vazio");
    expect(square).not.toBeDisabled();
  });

  test("renders square with X value correctly", () => {
    renderWithTheme(<Square value="X" onClick={mockOnClick} index={0} />);

    const square = screen.getByRole("button");
    expect(square).toHaveTextContent("X");
    expect(square).toHaveAttribute("aria-label", "Quadrado 1, ocupado por X");
    expect(square).toBeDisabled();
  });

  test("handles click on empty square", () => {
    renderWithTheme(<Square value="" onClick={mockOnClick} index={0} />);

    const square = screen.getByRole("button");
    fireEvent.click(square);
    expect(mockOnClick).toHaveBeenCalledWith(0);
  });

  test("prevents click on filled square", () => {
    renderWithTheme(<Square value="O" onClick={mockOnClick} index={0} />);

    const square = screen.getByRole("button");
    fireEvent.click(square);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test("handles keyboard interactions", () => {
    renderWithTheme(<Square value="" onClick={mockOnClick} index={0} />);

    const square = screen.getByRole("button");

    // Test Enter key
    fireEvent.keyDown(square, { key: "Enter" });
    expect(mockOnClick).toHaveBeenCalledWith(0);

    // Test Space key
    fireEvent.keyDown(square, { key: " " });
    expect(mockOnClick).toHaveBeenCalledWith(0);

    // Test other keys (should not trigger)
    fireEvent.keyDown(square, { key: "A" });
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });

  test("applies winning styles when isWinning is true", () => {
    renderWithTheme(
      <Square value="X" onClick={mockOnClick} index={0} isWinning={true} />
    );

    const square = screen.getByRole("button");
    expect(square).toHaveStyleRule(
      "background",
      "var(--color-success, #22c55e)",
      {
        modifier: "&",
      }
    );
    expect(square).toHaveStyleRule("animation", expect.stringMatching(/1s/), {
      modifier: "&",
    });
  });

  test("handles disabled state", () => {
    renderWithTheme(
      <Square value="" onClick={mockOnClick} index={0} disabled={true} />
    );

    const square = screen.getByRole("button");
    expect(square).toBeDisabled();
    expect(square).toHaveAttribute("tabIndex", "-1");

    fireEvent.click(square);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test("sets correct tabIndex based on state", () => {
    const { rerender } = renderWithTheme(
      <Square value="" onClick={mockOnClick} index={0} />
    );

    let square = screen.getByRole("button");
    expect(square).toHaveAttribute("tabIndex", "0");

    // With value
    rerender(
      <ThemeProvider theme={mockTheme}>
        <Square value="X" onClick={mockOnClick} index={0} />
      </ThemeProvider>
    );

    square = screen.getByRole("button");
    expect(square).toHaveAttribute("tabIndex", "-1");

    // Disabled
    rerender(
      <ThemeProvider theme={mockTheme}>
        <Square value="" onClick={mockOnClick} index={0} disabled={true} />
      </ThemeProvider>
    );

    square = screen.getByRole("button");
    expect(square).toHaveAttribute("tabIndex", "-1");
  });
});
