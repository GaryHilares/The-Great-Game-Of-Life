import { GameOfLife } from "./GameOfLife";
import { io, Socket } from "socket.io-client";
import { useState, useEffect, useRef } from "react";

interface ServerToClientEvents {
    toggleOnClient: (x: number, y: number, alive: boolean) => void;
    refreshClient: (
        n: number,
        m: number,
        board: boolean[],
        nextUpdateTime: number
    ) => void;
}

interface ClientToServerEvents {
    requestToggle: (x: number, y: number, alive: boolean) => void;
    requestRefresh: () => void;
}

interface GameOfLifeDriver {
    game: GameOfLife | null;
    tryToToggle: (x: number, y: number, alive: boolean) => void;
    requestRefresh: () => void;
}

function useGameOfLifeDriver(): GameOfLifeDriver {
    /**
     * @todo Add domain name once it is created.
     */
    const [game, setGame] = useState<GameOfLife | null>(null);
    const socketRef = useRef<Socket<
        ServerToClientEvents,
        ClientToServerEvents
    > | null>(null);
    useEffect(() => {
        socketRef.current = io("localhost:3000", {});
        const socket = socketRef.current;
        socket.io.on("error", (error) => {
            console.error(error);
        });
        socket.on("toggleOnClient", (x, y, alive) => {
            console.log(`toggleOnClient(${x}, ${y}) received.`);
            setGame((game) => (game ? game.applyToggle(x, y, alive) : null));
        });
        socket.on("refreshClient", (n, m, board, nextUpdateTime) => {
            console.log("refreshClient received.");
            setGame((game) =>
                game
                    ? game.applyRefresh(n, m, board, nextUpdateTime)
                    : new GameOfLife(n, m, board, nextUpdateTime)
            );
        });
        socketRef.current.emit("requestRefresh");
        return () => socket.close();
    }, []);
    function tryToToggle(x: number, y: number, alive: boolean) {
        if (socketRef.current) {
            socketRef.current.emit("requestToggle", x, y, alive);
        }
    }
    function requestRefresh() {
        if (socketRef.current) {
            socketRef.current.emit("requestRefresh");
        }
    }
    return {
        game: game,
        tryToToggle: tryToToggle,
        requestRefresh: requestRefresh,
    };
}

export { useGameOfLifeDriver };
