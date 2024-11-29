import { GameOfLifeView } from "./GameOfLifeView";
import { GameOfLife } from "./GameOfLife";

/**
 * Impure component that renders the app.
 * @returns A JSX component that represents the app.
 */
function App() {
    const game = new GameOfLife(2, 1, [true, false], 1);
    return <GameOfLifeView game={game} />;
}

export default App;
