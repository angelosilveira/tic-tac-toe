import { useState, useCallback } from "react";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Linhas
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Colunas
  [0, 4, 8],
  [2, 4, 6], // Diagonais
];

export const useGameLogic = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameStatus, setGameStatus] = useState("playing"); // 'playing', 'won', 'draw'
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  const checkWinner = useCallback((boardState) => {
    for (let combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        return { winner: boardState[a], line: combination };
      }
    }
    return null;
  }, []);

  const makeMove = useCallback(
    (index) => {
      if (board[index] || gameStatus !== "playing") return false;

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const result = checkWinner(newBoard);
      if (result) {
        setWinner(result.winner);
        setWinningLine(result.line);
        setGameStatus("won");
        return true;
      }

      if (newBoard.every((cell) => cell !== null)) {
        setGameStatus("draw");
        return true;
      }

      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      return true;
    },
    [board, currentPlayer, gameStatus, checkWinner]
  );

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setGameStatus("playing");
    setWinner(null);
    setWinningLine([]);
  }, []);

  const autoMove = useCallback(() => {
    if (gameStatus !== "playing") return;

    const availableMoves = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null);

    if (availableMoves.length > 0) {
      const randomMove =
        availableMoves[Math.floor(Math.random() * availableMoves.length)];
      makeMove(randomMove);
    }
  }, [board, gameStatus, makeMove]);

  return {
    board,
    currentPlayer,
    gameStatus,
    winner,
    winningLine,
    makeMove,
    resetGame,
    autoMove,
  };
};
