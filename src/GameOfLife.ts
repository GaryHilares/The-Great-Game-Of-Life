/**
 * @brief Represents a game of life in the frontend.
 */
class GameOfLife {
    private n: number;
    private m: number;
    private board: boolean[];
    private nextUpdateTime: number;

    /**
     * Creates a new GameOfLife.
     */
    constructor(
        n: number,
        m: number,
        board: boolean[],
        nextUpdateTime: number
    ) {
        this.n = n;
        this.m = m;
        this.board = board;
        this.nextUpdateTime = nextUpdateTime;
    }

    /**
     * Receives a toggle message and processes it into the board state.
     * @param x x-coordinate of tile that was toggled.
     * @param y y-coordinate of tile that was toggled.
     */
    applyToggle(x: number, y: number): GameOfLife {
        const newBoard = Array.from<boolean>(this.board);
        newBoard[x + y * this.n] = !newBoard[x + y * this.n];
        return new GameOfLife(this.n, this.m, newBoard, this.nextUpdateTime);
    }

    /**
     * Receives a refresh message and processes it into the board state.
     * @param n Number of columns in the board.
     * @param m Number of rows in the board.
     * @param board Current board state.
     */
    applyRefresh(
        n: number,
        m: number,
        board: boolean[],
        nextUpdateTime: number
    ): GameOfLife {
        return new GameOfLife(n, m, board, nextUpdateTime);
    }
}

export { GameOfLife };
