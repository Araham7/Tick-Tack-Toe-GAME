import { useCallback, useEffect, useState } from "react";
import Card from "../Card/Card.jsx";
import "./Grid.css";
import { getWinner, isBoardFull } from "../../helpers/checkWinner.js";
import { getComputerMove } from "../../helpers/ai.js";

const HUMAN = "O";
const COMPUTER = "X";
const other = (s) => (s === "X" ? "O" : "X");

// Board + starter se pata chalta hai kiski baari hai — alag state rakhne ki zarurat nahi.
function currentTurn(board, starter) {
  const filled = board.filter((c) => c !== "").length;
  return filled % 2 === 0 ? starter : other(starter);
}

function evaluate(board) {
  const win = getWinner(board);
  if (win) return { type: "win", ...win };
  if (isBoardFull(board)) return { type: "draw" };
  return null;
}

// Jeetne wali line ke liye highlighter ke start/end points (300x300 board par)
function lineCoords([a, , c]) {
  const center = (i) => [50 + (i % 3) * 100, 50 + Math.floor(i / 3) * 100];
  const [x1, y1] = center(a);
  const [x2, y2] = center(c);
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ex = ((x2 - x1) / len) * 24;
  const ey = ((y2 - y1) / len) * 24;
  return { x1: x1 - ex, y1: y1 - ey, x2: x2 + ex, y2: y2 + ey };
}

const freshGame = (size) => ({
  board: Array(size).fill(""),
  starter: "O",
  scores: { X: 0, O: 0, draw: 0 },
});

// Ek move apply karo (pure function) — score bhi yahin update hota hai.
function applyMove(game, index) {
  if (game.board[index] !== "" || evaluate(game.board)) return game;
  const board = [...game.board];
  board[index] = currentTurn(game.board, game.starter);

  const result = evaluate(board);
  if (!result) return { ...game, board };

  const key = result.type === "draw" ? "draw" : result.winner;
  return { ...game, board, scores: { ...game.scores, [key]: game.scores[key] + 1 } };
}

function Grid({ numberOfCards = 9, mode, difficulty }) {
  const [game, setGame] = useState(() => freshGame(numberOfCards));
  const { board, starter, scores } = game;

  const result = evaluate(board);
  const turn = currentTurn(board, starter);
  const vsComputer = mode === "cpu";
  const computerThinking = vsComputer && !result && turn === COMPUTER;

  const play = useCallback((index) => setGame((g) => applyMove(g, index)), []);

  // Computer ki chaal (thoda delay taaki natural lage)
  useEffect(() => {
    if (!computerThinking) return;
    const timer = setTimeout(() => {
      const move = getComputerMove(board, COMPUTER, HUMAN, difficulty);
      play(move);
    }, 450);
    return () => clearTimeout(timer);
  }, [computerThinking, board, difficulty, play]);

  // Next round: board saaf, aur starter badal jata hai (fair game)
  function nextRound() {
    setGame((g) => ({ ...g, board: Array(numberOfCards).fill(""), starter: other(g.starter) }));
  }

  function resetAll() {
    setGame(freshGame(numberOfCards));
  }

  const winLine = result?.type === "win" ? lineCoords(result.line) : null;

  const name = (s) => {
    if (!vsComputer) return `Player ${s}`;
    return s === HUMAN ? "You" : "Computer";
  };

  let status;
  if (result?.type === "win") {
    status = vsComputer
      ? result.winner === HUMAN ? "You win!" : "Computer wins this one."
      : `${result.winner} wins!`;
  } else if (result?.type === "draw") {
    status = "It's a draw.";
  } else if (computerThinking) {
    status = "Computer is thinking…";
  } else {
    status = vsComputer ? "Your move" : `${turn} to move`;
  }

  return (
    <div className="game">
      <div className="scoreboard">
        <div className={`score score-o ${!result && turn === "O" ? "active" : ""}`}>
          <span className="score-name">{name("O")}</span>
          <span className="score-value">{scores.O}</span>
        </div>
        <div className="score score-draw">
          <span className="score-name">Draws</span>
          <span className="score-value">{scores.draw}</span>
        </div>
        <div className={`score score-x ${!result && turn === "X" ? "active" : ""}`}>
          <span className="score-name">{name("X")}</span>
          <span className="score-value">{scores.X}</span>
        </div>
      </div>

      <div className="board">
        <svg className="board-lines" viewBox="0 0 300 300" aria-hidden="true">
          {winLine && (
            <line
              className="highlighter"
              pathLength="1"
              x1={winLine.x1} y1={winLine.y1} x2={winLine.x2} y2={winLine.y2}
            />
          )}
          <path pathLength="1" d="M102 10 C 98 90, 104 200, 99 290" />
          <path pathLength="1" d="M201 8 C 204 100, 197 210, 202 292" />
          <path pathLength="1" d="M10 99 C 90 103, 210 96, 292 101" />
          <path pathLength="1" d="M8 201 C 100 197, 200 204, 290 199" />
        </svg>

        <div className="cells">
          {board.map((cell, index) => (
            <Card
              key={index}
              index={index}
              player={cell}
              onPlay={play}
              hoverSymbol={turn}
              disabled={Boolean(result) || computerThinking}
            />
          ))}
        </div>
      </div>

      <p className={`status ${result ? "status-end" : ""}`} aria-live="polite">
        {status}
      </p>

      <div className="actions">
        <button type="button" className="btn btn-primary" onClick={nextRound}>
          {result ? "Play again" : "Restart round"}
        </button>
        <button type="button" className="btn btn-quiet" onClick={resetAll}>
          Reset scores
        </button>
      </div>
    </div>
  );
}

export default Grid;
