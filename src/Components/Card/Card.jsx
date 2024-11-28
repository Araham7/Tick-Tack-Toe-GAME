import Icon from "../Icon/Icon.jsx"; // Importing "Icon" component.
import "./Card.css"; // Importing "Card.css" for styling.

function Card({ player, onPlay, index , gameEnd }) {
  let icon = <Icon />; // Default icon (pen icon).

  if (player === "O") {
    icon = <Icon name="circle" />; // "circle-icon" for player O.
  } else if (player === "X") {
    icon = (
      <Icon name="cross"/> // "cross-icon" for player X with onClick handler.
    );
  }

  return (
    <div className="card"  onClick={() => !gameEnd && onPlay(index)} >
      {icon}
    </div>
  );
}

export default Card;


