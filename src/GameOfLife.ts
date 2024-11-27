/**
 * @brief Represents a GameOfLife game.
 */
class GameOfLife {
    private n: number;
    private m: number;
    private board: boolean[];

    /**
     * Creates a new GameOfLife using the given features.
     * @param n Amount of columns in this game.
     * @param m Amount of rows in this game.
     */
    constructor(n: number, m: number) {
        this.n = n;
        this.m = m;
        this.board = Array<boolean>(n * m).fill(false);
    }

    /**
     * @brief Creates a copy of this game of life in its next game state.
     * @return A copy of this game of life in its next game state.
     */
    nextState(): GameOfLife {
        /**
         * @todo Implement this method.
         */
        return this; // stub
    }

    /**
     * @brief Creates a copy of this game with the given square toggled.
     * @param x The x-coordinate of the square to be toggled.
     * @param y The y-coordinate of the square to be toggled.
     * @return A copy of this game of life, with the given square toggled.
     */
    toggle(x: number, y: number): GameOfLife {
        /**
         * @todo Implement this method.
         */
        return this; // stub
    }
}

export { GameOfLife };
