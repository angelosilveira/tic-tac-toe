/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import GameStatus from "./GameStatus";

const mockTheme = {
  primary: "#1e40af",
  secondary: "#10b981",
  background: "#f8fafc",
  boardBg: "#ffffff",
};

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
};

describe("GameStatus", () => {
  const mockOnNewGame = jest.fn();
  const mockOnUpdateScore = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders nothing when game is playing", () => {
    renderWithTheme(
      <GameStatus
        gameStatus="playing"
        onNewGame={mockOnNewGame}
        onUpdateScore={mockOnUpdateScore}
      />
    );

    expect(screen.queryByText(/Venceu!/)).not.toBeInTheDocument();
    expect(screen.queryByText("Empate!")).not.toBeInTheDocument();
  });

  test("renders winner message when game is won", () => {
    renderWithTheme(
      <GameStatus
        gameStatus="won"
        winner="X"
        onNewGame={mockOnNewGame}
        onUpdateScore={mockOnUpdateScore}
      />
    );

    expect(screen.getByText("Jogador X Venceu!")).toBeInTheDocument();
    expect(screen.getByText("Parabéns pela vitória!")).toBeInTheDocument();
  });

  test("renders draw message when game is a draw", () => {
    renderWithTheme(
      <GameStatus
        gameStatus="draw"
        onNewGame={mockOnNewGame}
        onUpdateScore={mockOnUpdateScore}
      />
    );

    expect(screen.getByText("Empate!")).toBeInTheDocument();
    expect(screen.getByText("Que jogo equilibrado!")).toBeInTheDocument();
  });

  test("calls onUpdateScore and onNewGame when clicking new game button after win", () => {
    renderWithTheme(
      <GameStatus
        gameStatus="won"
        winner="X"
        onNewGame={mockOnNewGame}
        onUpdateScore={mockOnUpdateScore}
      />
    );

    fireEvent.click(screen.getByText("Novo Jogo"));

    expect(mockOnUpdateScore).toHaveBeenCalledWith("X");
    expect(mockOnNewGame).toHaveBeenCalled();
  });

  test("calls onUpdateScore and onNewGame when clicking new game button after draw", () => {
    renderWithTheme(
      <GameStatus
        gameStatus="draw"
        onNewGame={mockOnNewGame}
        onUpdateScore={mockOnUpdateScore}
      />
    );

    fireEvent.click(screen.getByText("Novo Jogo"));

    expect(mockOnUpdateScore).toHaveBeenCalledWith("draw");
    expect(mockOnNewGame).toHaveBeenCalled();
  });

  test("renders trophy icon for win and users icon for draw", () => {
    const { rerender } = renderWithTheme(
      <GameStatus
        gameStatus="won"
        winner="X"
        onNewGame={mockOnNewGame}
        onUpdateScore={mockOnUpdateScore}
      />
    );

    expect(screen.getByText("Jogador X Venceu!")).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={mockTheme}>
        <GameStatus
          gameStatus="draw"
          onNewGame={mockOnNewGame}
          onUpdateScore={mockOnUpdateScore}
        />
      </ThemeProvider>
    );

    expect(screen.getByText("Empate!")).toBeInTheDocument();
  });
});
