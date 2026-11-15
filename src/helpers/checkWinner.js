// Board index layout:
// 0 1 2
// 3 4 5
// 6 7 8

export const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

/**
 * Board check karta hai.
 * @returns {{ winner: "X" | "O", line: number[] } | null}
 */
export function getWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return null;
}

export function isBoardFull(board) {
  return board.every((cell) => cell !== "");
}
