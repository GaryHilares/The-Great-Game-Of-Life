import { GameOfLife } from "./GameOfLife";
import styles from "./GameOfLife.module.scss";

/**
 * Pure component that renders a game of life board.
 * @param props The props for this component, including the game to render.
 */
function GameOfLifeView({
    game,
    onClick,
}: {
    game: GameOfLife;
    onClick: (x: number, y: number, alive: boolean) => void;
}) {
    const width = game.getWidth();
    const height = game.getHeight();
    return [...Array<number>(height).keys()].map((x) => [
        [...Array<number>(width).keys()].map((y) => (
            <button
                key={x + y * width}
                className={
                    game.getTileAt(x, y)
                        ? styles["tile-alive"]
                        : styles["tile-dead"]
                }
                onClick={() => onClick(x, y, !game.getTileAt(x, y))}
            />
        )),
    ]);
}

export { GameOfLifeView };
