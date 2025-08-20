/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { describe, expect, test } from "@jest/globals";
import Timer from "./Timer";

const mockTheme = {
  primary: "#1e40af",
  secondary: "#10b981",
  background: "#f8fafc",
  boardBg: "#ffffff",
};

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
};

describe("Timer", () => {
  test("renders with normal time", () => {
    renderWithTheme(<Timer timeLeft={5} currentPlayer="X" />);

    expect(screen.getByText("Vez do jogador X")).toBeInTheDocument();
    expect(screen.getByText("5s")).toBeInTheDocument();

    const timeNumber = screen.getByText("5s");
    expect(timeNumber).toHaveStyle({
      color: "var(--color-textPrimary, #1f2937)",
    });
  });

  test("renders with low time warning", () => {
    renderWithTheme(<Timer timeLeft={2} currentPlayer="O" />);

    expect(screen.getByText("Vez do jogador O")).toBeInTheDocument();
    expect(screen.getByText("2s")).toBeInTheDocument();

    const timeNumber = screen.getByText("2s");
    expect(timeNumber).toHaveStyle({ color: "#ef4444" });
  });

  test("displays correct progress bar percentage", () => {
    renderWithTheme(<Timer timeLeft={3} currentPlayer="X" />);

    const progressBar = screen.getByTestId("timer-progress");
    expect(progressBar).toHaveStyle({ width: "60%" });
  });

  test("shows urgent progress bar when time is low", () => {
    renderWithTheme(<Timer timeLeft={1} currentPlayer="X" />);

    const progressBar = screen.getByTestId("timer-progress");
    expect(progressBar).toHaveStyle({
      background: "#ef4444",
      width: "20%",
    });
  });

  test("shows clock icon", () => {
    renderWithTheme(<Timer timeLeft={5} currentPlayer="X" />);

    expect(screen.getByTestId("timer-clock-icon")).toBeInTheDocument();
  });

  test("calculates percentage correctly for different times", () => {
    const { rerender } = renderWithTheme(
      <Timer timeLeft={5} currentPlayer="X" />
    );

    let progressBar = screen.getByTestId("timer-progress");
    expect(progressBar).toHaveStyle({ width: "100%" });

    rerender(
      <ThemeProvider theme={mockTheme}>
        <Timer timeLeft={2.5} currentPlayer="X" />
      </ThemeProvider>
    );

    progressBar = screen.getByTestId("timer-progress");
    expect(progressBar).toHaveStyle({ width: "50%" });
  });
});
