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
    updateTime: number | null;
}

function useGameOfLifeDriver(): GameOfLifeDriver {
    /**
     * @todo Add domain name once it is created.
     */
    const [game, setGame] = useState<GameOfLife | null>(null);
    const [updateTime, setUpdateTime] = useState<number | null>(null);
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
            setUpdateTime(nextUpdateTime);
            setGame((game) =>
                game
                    ? game.applyRefresh(n, m, board)
                    : new GameOfLife(n, m, board)
            );
        });
        socketRef.current.emit("requestRefresh");

        /**
         * Counter can be null or number.
         * While null, wait for refresh. If not null and <=0, request refresh and wait for it.
         * Otherwise, decrease counter by one.
         *
         * States of counter: decreasing or waiting
         */
        const interval = setInterval(() => {
            setUpdateTime((oldUpdateTime) => {
                if (oldUpdateTime !== null && oldUpdateTime - 1 <= 0) {
                    (
                        socketRef.current as Socket<
                            ServerToClientEvents,
                            ClientToServerEvents
                        >
                    ).emit("requestRefresh");
                    return null;
                } else if (oldUpdateTime === null) {
                    return null;
                } else {
                    return oldUpdateTime - 1;
                }
            });
        }, 1000);
        return () => {
            clearInterval(interval);
            socket.disconnect();
        };
    }, []);
    function tryToToggle(x: number, y: number, alive: boolean) {
        if (socketRef.current) {
            socketRef.current.emit("requestToggle", x, y, alive);
        }
    }
    return {
        game: game,
        tryToToggle: tryToToggle,
        updateTime: updateTime,
    };
}

export { useGameOfLifeDriver };
