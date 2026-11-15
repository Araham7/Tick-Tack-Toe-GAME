import { getWinner, isBoardFull } from "./checkWinner.js";

function emptyCells(board) {
  return board.reduce((acc, cell, i) => (cell === "" ? [...acc, i] : acc), []);
}

function randomMove(board) {
  const cells = emptyCells(board);
  return cells[Math.floor(Math.random() * cells.length)];
}

// Minimax — perfect play. Depth se jaldi jeetna / der se haarna prefer karta hai.
function minimax(board, ai, human, isAiTurn, depth) {
  const result = getWinner(board);
  if (result) return result.winner === ai ? 10 - depth : depth - 10;
  if (isBoardFull(board)) return 0;

  let best = isAiTurn ? -Infinity : Infinity;
  for (const i of emptyCells(board)) {
    board[i] = isAiTurn ? ai : human;
    const score = minimax(board, ai, human, !isAiTurn, depth + 1);
    board[i] = "";
    best = isAiTurn ? Math.max(best, score) : Math.min(best, score);
  }
  return best;
}

function bestMove(board, ai, human) {
  const copy = [...board];
  let bestScore = -Infinity;
  let moves = [];
  for (const i of emptyCells(copy)) {
    copy[i] = ai;
    const score = minimax(copy, ai, human, false, 1);
    copy[i] = "";
    if (score > bestScore) {
      bestScore = score;
      moves = [i];
    } else if (score === bestScore) {
      moves.push(i);
    }
  }
  // Barabar score wali moves me se random — taaki har game same na lage.
  return moves[Math.floor(Math.random() * moves.length)];
}

/**
 * difficulty: "easy" (random), "medium" (60% perfect), "hard" (hamesha perfect)
 */
export function getComputerMove(board, ai, human, difficulty) {
  if (difficulty === "easy") return randomMove(board);
  if (difficulty === "medium" && Math.random() < 0.4) return randomMove(board);
  return bestMove(board, ai, human);
}
