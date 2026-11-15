import Icon from "../Icon/Icon.jsx";
import "./Card.css";

function Card({ player, index, onPlay, disabled, hoverSymbol }) {
  const filled = player !== "";

  return (
    <button
      type="button"
      className="cell"
      onClick={() => onPlay(index)}
      disabled={disabled || filled}
      aria-label={filled ? `Square ${index + 1}, ${player}` : `Square ${index + 1}, empty`}
    >
      {filled ? <Icon name={player} /> : !disabled && <Icon name={hoverSymbol} ghost />}
    </button>
  );
}

export default Card;
