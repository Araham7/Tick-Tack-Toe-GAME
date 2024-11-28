import Card from "./Components/Card/Card.jsx"; // importing "Card".
import "./App.css"; // imorting "App.css".
import Grid from "./Components/Grid/Grid.jsx";

function App() {

  return (
    <>
    <div className="main-body">
      <span className="heading"> Tick-Tack-Toe-GAME </span>
      <Grid numberOfCards={9} />
    </div>
    </>
  )
}

export default App
