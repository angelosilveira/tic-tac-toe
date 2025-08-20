/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import "jest-styled-components";
import { ThemeProvider } from "styled-components";
import {
  describe,
  test,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import ScoreBoard from "./ScoreBoard";

const mockTheme = {
  primary: "#1e40af",
  secondary: "#10b981",
  background: "#f8fafc",
  boardBg: "#ffffff",
};

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
};

describe("ScoreBoard", () => {
  const mockOnReset = jest.fn();
  const defaultScores = {
    playerXScore: 0,
    playerOScore: 0,
    draws: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders initial scores correctly", async () => {
    await act(async () => {
      renderWithTheme(
        <ScoreBoard scores={defaultScores} onReset={mockOnReset} />
      );
    });

    expect(screen.getByText("Placar")).toBeInTheDocument();
    expect(screen.getByText("Jogador X")).toBeInTheDocument();
    expect(screen.getByText("Jogador O")).toBeInTheDocument();
    expect(screen.getByText("Empates")).toBeInTheDocument();
    expect(screen.getByText("Total: 0 jogos")).toBeInTheDocument();
  });

  test("shows reset button only when there are games played", async () => {
    const { rerender } = renderWithTheme(
      <ScoreBoard scores={defaultScores} onReset={mockOnReset} />
    );

    expect(screen.queryByText("Resetar Placar")).not.toBeInTheDocument();

    const scoresWithGames = {
      playerXScore: 1,
      playerOScore: 0,
      draws: 0,
    };

    await act(async () => {
      rerender(
        <ThemeProvider theme={mockTheme}>
          <ScoreBoard scores={scoresWithGames} onReset={mockOnReset} />
        </ThemeProvider>
      );
    });

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText("Resetar Placar")).toBeInTheDocument();
  });

  test("calls onReset when reset button is clicked", async () => {
    const scores = {
      playerXScore: 1,
      playerOScore: 1,
      draws: 1,
    };

    await act(async () => {
      renderWithTheme(<ScoreBoard scores={scores} onReset={mockOnReset} />);
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Resetar Placar"));
    });

    expect(mockOnReset).toHaveBeenCalled();
  });

  test("calculates total games correctly", async () => {
    const scores = {
      playerXScore: 2,
      playerOScore: 3,
      draws: 1,
    };

    await act(async () => {
      renderWithTheme(<ScoreBoard scores={scores} onReset={mockOnReset} />);
    });

    expect(screen.getByText("Total: 6 jogos")).toBeInTheDocument();
  });

  test("handles animation states correctly", async () => {
    const { rerender } = renderWithTheme(
      <ScoreBoard scores={defaultScores} onReset={mockOnReset} />
    );

    await act(async () => {
      rerender(
        <ThemeProvider theme={mockTheme}>
          <ScoreBoard
            scores={{
              playerXScore: 1,
              playerOScore: 0,
              draws: 0,
            }}
            onReset={mockOnReset}
          />
        </ThemeProvider>
      );
    });

    const scoreValue = screen.getByText("1");
    expect(scoreValue).toHaveStyleRule(
      "animation",
      expect.stringMatching(/0\.3s ease-out/)
    );

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    const styles = window.getComputedStyle(scoreValue);
    expect(styles.animation).toBe("none");
  });
});
