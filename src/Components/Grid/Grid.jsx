import { useState } from "react"; // Importing "useState" from "react".
import Card from "../Card/Card.jsx"; // Importing "Card" component.
import "./Grid.css"; // Importing "Grid.css" for styling.
import isWinner from "../../helpers/checkWinner.js"; // Importing "winner-checking function".

function Grid({ numberOfCards }) {
  const [board, setBoard] = useState(Array(numberOfCards).fill("")); // Initializing the board with empty strings.

  const [turn, setTurn] = useState(true); // This variable tracks whose turn it is (true for "O", false for "X").

  const [winner, setWinner] = useState(null); // State to store the winner.

  // play-function :---
  function play(indx) {
    if (board[indx] !== "") return; // Prevent overwriting an already filled cell.

    const updatedBoard = [...board]; // Copy the board to avoid mutation.
    updatedBoard[indx] = turn ? "O" : "X"; // Mark the current player's symbol.

    const win = isWinner(updatedBoard, turn ? "O" : "X"); // Check if there's a winner.

    if (win) {
      setWinner(win); // If there's a winner, set the winner.
    }

    setBoard(updatedBoard); // Update the board state with the new board.
    setTurn(!turn); // Toggle the turn.
  }

  // Reset-button-function :---
  function resetGame() {
    setTurn(true);
    setWinner(null);
    setBoard(Array(numberOfCards).fill(""));
  }

  return (
    <>
      {winner && (
        <>
          <h1 className="winner-status-text">Winner is: {winner}</h1>
          <button className="reset-btn" onClick={ resetGame }>Reset Game</button>
        </>
      )}

      <h1 className="current-turn-status">
        The current turn belongs to: {turn ? "O" : "X"}
      </h1>
      
      <div className="grid">
        {board.map((element, index) => (
          <Card
            key={index}
            onPlay={play}
            player={element}
            index={index}
          />
        ))}
      </div>
    </>
  );
}

export default Grid;


/*
0 1 2
3 4 5
6 7 8
*/
