import { GameOfLife } from "./GameOfLife";
import styles from "./TheGreatGameOfLife.module.scss";

/**
 * Pure component that renders a game of life board.
 * @param props The props for this component, including the game to render.
 */
function GameOfLifeView({ game }: { game: GameOfLife }) {
    const width = game.getWidth();
    const height = game.getHeight();
    return [...Array<number>(height).keys()].map((x) => [
        [...Array<number>(width).keys()].map((y) => (
            <button
                className={
                    game.getTileAt(x, y)
                        ? styles["tile-alive"]
                        : styles["tile-dead"]
                }
            />
        )),
    ]);
}

export { GameOfLifeView };
