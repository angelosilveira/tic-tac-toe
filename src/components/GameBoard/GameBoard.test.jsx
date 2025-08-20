/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import GameBoard from "./GameBoard";

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

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
};

describe("GameBoard", () => {
  const mockBoard = ["X", "O", "X", "", "O", "", "X", "", ""];
  const mockOnSquareClick = jest.fn();

  test("renders all squares with correct values", () => {
    renderWithTheme(
      <GameBoard board={mockBoard} onSquareClick={mockOnSquareClick} />
    );

    // Verifica se todos os quadrados foram renderizados
    const squares = screen.getAllByRole("button");
    expect(squares).toHaveLength(9);

    // Verifica se os valores estão corretos
    mockBoard.forEach((value, index) => {
      if (value) {
        expect(squares[index]).toHaveTextContent(value);
      } else {
        expect(squares[index]).toHaveTextContent("");
      }
    });
  });

  test("calls onSquareClick with correct index when square is clicked", () => {
    renderWithTheme(
      <GameBoard board={mockBoard} onSquareClick={mockOnSquareClick} />
    );

    // Clica em um quadrado vazio
    const emptySquare = screen.getAllByRole("button")[5]; // índice 5 está vazio no mockBoard
    fireEvent.click(emptySquare);

    expect(mockOnSquareClick).toHaveBeenCalledWith(5);
  });

  test("highlights winning squares", () => {
    const winningLine = [0, 3, 6]; // Coluna da esquerda

    renderWithTheme(
      <GameBoard
        board={mockBoard}
        onSquareClick={mockOnSquareClick}
        winningLine={winningLine}
      />
    );

    const squares = screen.getAllByRole("button");
    winningLine.forEach((index) => {
      expect(squares[index]).toHaveAttribute("data-winning", "true");
    });
  });

  test("disables all squares when disabled prop is true", () => {
    renderWithTheme(
      <GameBoard
        board={mockBoard}
        onSquareClick={mockOnSquareClick}
        disabled={true}
      />
    );

    const squares = screen.getAllByRole("button");
    squares.forEach((square) => {
      expect(square).toBeDisabled();
    });

    // Tenta clicar em um quadrado
    fireEvent.click(squares[5]); // índice 5 está vazio no mockBoard
    expect(mockOnSquareClick).not.toHaveBeenCalled();
  });

  test("allows clicking only on empty squares", () => {
    renderWithTheme(
      <GameBoard board={mockBoard} onSquareClick={mockOnSquareClick} />
    );

    const squares = screen.getAllByRole("button");

    // Tenta clicar em um quadrado ocupado (índice 0 tem "X")
    fireEvent.click(squares[0]);
    expect(mockOnSquareClick).not.toHaveBeenCalledWith(0);

    // Clica em um quadrado vazio (índice 5 está vazio)
    fireEvent.click(squares[5]);
    expect(mockOnSquareClick).toHaveBeenCalledWith(5);
  });

  test("renders board with empty values", () => {
    const emptyBoard = Array(9).fill("");
    renderWithTheme(
      <GameBoard board={emptyBoard} onSquareClick={mockOnSquareClick} />
    );

    const squares = screen.getAllByRole("button");
    squares.forEach((square) => {
      expect(square).toHaveTextContent("");
      expect(square).not.toBeDisabled();
    });
  });
});
