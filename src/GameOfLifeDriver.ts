interface WebSocket {
    on(eventName: string, callback: () => void): void;
    emit(eventName: string): void;
}

/**
 * @brief Represents a driver that communicates with the backend
 *        to fetch and post data about a game of life.
 */
class GameOfLifeDriver {
    private n: number;
    private m: number;
    private board: boolean[];
    private socket: WebSocket;

    /**
     * Creates a new GameOfLifeDriver connected to the backend.
     */
    constructor() {}

    /**
     * Tries to toggle a tile on the map.
     * @param x x-coordinate of the tile to toggle.
     * @param y y-coordinate of the tile to toggle.
     * @return Promises true if the toggle was successful, or false otherwise.
     */
    tryToToggle(x: number, y: number): Promise<boolean> {
        /**
         * @todo Implement this method.
         */
        return new Promise((resolve, reject) => {
            reject("Not implemented yet.");
        }); // stub
    }

    /**
     * Sends a message to the backend requesting a refresh of the game state.
     */
    requestRefresh(): void {}

    /**
     * Receives a toggle message and processes it into the board state.
     * @param x x-coordinate of tile that was toggled.
     * @param y y-coordinate of tile that was toggled.
     */
    receiveToggle(x: number, y: number): void {}

    /**
     * Receives a refresh message and processes it into the board state.
     * @param n Number of columns in the board.
     * @param m Number of rows in the board.
     * @param board Current board state.
     */
    receiveRefresh(n: number, m: number, board: boolean[]): void {}
}
