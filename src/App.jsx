import { useState } from "react";
import Grid from "./Components/Grid/Grid.jsx";

const MODES = [
  { id: "pvp", label: "2 players" },
  { id: "cpu", label: "vs computer" },
];

const LEVELS = ["easy", "medium", "hard"];

function App() {
  const [mode, setMode] = useState("pvp");
  const [difficulty, setDifficulty] = useState("medium");

  return (
    <main className="main-body">
      <h1 className="heading">Tic Tac Toe</h1>

      <div className="toggle" role="group" aria-label="Game mode">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            className={mode === m.id ? "selected" : ""}
            aria-pressed={mode === m.id}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === "cpu" && (
        <div className="toggle small" role="group" aria-label="Difficulty">
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              type="button"
              className={difficulty === lvl ? "selected" : ""}
              aria-pressed={difficulty === lvl}
              onClick={() => setDifficulty(lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>
      )}

      {/* key badalne se mode change par game fresh start hota hai */}
      <Grid key={mode} numberOfCards={9} mode={mode} difficulty={difficulty} />

      <footer className="footer">
        {mode === "cpu"
          ? "You play O, the computer plays X."
          : "Whoever went second starts the next round."}
      </footer>
    </main>
  );
}

export default App;
