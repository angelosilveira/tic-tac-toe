export const useLocalStorage = {
  saveScores: (scores) => {
    localStorage.setItem("tictactoe_scores", JSON.stringify(scores));
  },

  loadScores: () => {
    const saved = localStorage.getItem("tictactoe_scores");
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      playerXScore: 0,
      playerOScore: 0,
      draws: 0,
    };
  },

  resetScores: () => {
    localStorage.setItem(
      "tictactoe_scores",
      JSON.stringify({
        playerXScore: 0,
        playerOScore: 0,
        draws: 0,
      })
    );
  },
};
