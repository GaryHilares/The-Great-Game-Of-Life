import { GameOfLifeView } from "./GameOfLifeView";
import { useGameOfLifeDriver } from "./useGameOfLifeDriver";

/**
 * Impure component that renders the app.
 * @returns A JSX component that represents the app.
 */
function App() {
    const gameDriver = useGameOfLifeDriver();
    return (
        gameDriver.game && (
            <GameOfLifeView
                game={gameDriver.game}
                onClick={gameDriver.tryToToggle}
            />
        )
    );
}

export default App;
