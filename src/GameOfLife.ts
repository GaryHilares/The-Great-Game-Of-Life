/**
 * @brief Represents a game of life in the frontend.
 */
class GameOfLife {
    private n: number;
    private m: number;
    private board: boolean[];

    /**
     * Creates a new GameOfLife.
     */
    constructor(n: number, m: number, board: boolean[]) {
        this.n = n;
        this.m = m;
        this.board = board;
    }

    /**
     * Receives a toggle message and processes it into the board state.
     * @param x x-coordinate of tile that was toggled.
     * @param y y-coordinate of tile that was toggled.
     */
    applyToggle(x: number, y: number, alive: boolean): GameOfLife {
        const newBoard = Array.from<boolean>(this.board);
        const tileBoardCoordinate = this.toBoardCoordinate(x, y);
        newBoard[tileBoardCoordinate] = alive;
        return new GameOfLife(this.n, this.m, newBoard);
    }

    /**
     * Receives a refresh message and processes it into the board state.
     * @param n Number of columns in the board.
     * @param m Number of rows in the board.
     * @param board Current board state.
     */
    applyRefresh(n: number, m: number, board: boolean[]): GameOfLife {
        return new GameOfLife(n, m, board);
    }

    /**
     * Given a (x, y) pair, produces the corresponding board coordinate.
     * @param x The x-coordinate in two-dimensional coordinates.
     * @param y The y-coordinate in two-dimensional coordinates.
     * @returns The corresponding one-dimensional board coordinate.
     */
    private toBoardCoordinate(x: number, y: number): number {
        return x + y * this.n;
    }

    /**
     * Given a (x, y) pair, produces the tile value at these coordinates.
     * @param x The x-coordinate to get.
     * @param y The y-coordinate to get.
     * @returns The value of the board at (x, y).
     */
    getTileAt(x: number, y: number): boolean {
        return this.board[this.toBoardCoordinate(x, y)];
    }

    /**
     * Produces the width of the board.
     * @returns The width of the board.
     */
    getWidth(): number {
        return this.n;
    }

    /**
     * Produces the height of the board.
     * @returns The height of the board.
     */
    getHeight(): number {
        return this.m;
    }
}

export { GameOfLife };
