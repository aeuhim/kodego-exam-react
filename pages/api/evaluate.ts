import { NextApiRequest, NextApiResponse } from "next";

/**
 * This handler is responsible for processing game moves and determining the game state and winning tiles, if any.
 * 
 * API Endpoint:
 * 
 * /api/evaluate
 * 
 * The handler expects a POST request with a JSON body containing the following field:
 * 
 * {
 *    "moves": "sequence of moves"
 * }
 * 
 * - "moves" (string): A string representing the sequence of moves in the Tic-Tac-Toe game. 
 *   Each move consists of two characters representing the selected tile on the game board.
 *   The valid tile names are: A1, B1, C1, A2, B2, C2, A3, B3, C3.
 * 
 * The handler returns a JSON response with the following fields:
 * 
 * {
 *    "state": "game state",
 *    "winning_tiles": ["winning tile 1", "winning tile 2", ...]
 * }
 * 
 * - "state" (string): Represents the current state of the game. Possible values are:
 *   - "Player X Turns": Indicates that it's Player X's turn to make a move.
 *   - "Player O Turns": Indicates that it's Player O's turn to make a move.
 *   - "Player X Wins": Indicates that Player X has won the game.
 *   - "Player O Wins": Indicates that Player O has won the game.
 *   - "Draw": Indicates that no player has won the game.
 *   - "Illegal Request": Indicates an illegal request format.
 *   = "Illegal Move Length": Indicates an illegal move length.
 *   - "Illegal Unknown Move": Indicates an illegal unknown move.
 *   - "Illegal Duplicate Move": Indicates an attempt to select a tile that has already been taken.
 *   - "Illegal Extra Move": Indicates an illegal extra move was made after the game has ended.
 * 
 * - "winning_tiles" (array of strings): Contains the tiles forming a winning combination, 
 *   if a player has won the game. Otherwise, it will be an empty array.
 * 
 * Example Request:
 * 
 * POST /api/evaluate
 * Content-Type: application/json
 * 
 * {
 *   "moves": "A1B1A2B2A3"
 * }
 * 
 * Example Response:
 * 
 * HTTP/1.1 200 OK
 * Content-Type: application/json
 * 
 * {
 *   "state": "Player O Turns",
 *   "winning_tiles": []
 * }
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // extract proper subset
    const properSubset = (set: Set<String>, subset: Set<String>) => {
        for (const elem of subset) {
            if (!set.has(elem)) {
                return [];
            }
        }
        return [...subset.values()];
    }

    const moves = req.body?.moves;

    // check request validity
    if (typeof moves != "string") {
        res.status(403).json({
            state: "Illegal Request",
            winning_tiles: []
        });
        return;
    }

    const tiles = new Set(['A1', 'B1', 'C1', 'A2', 'B2', 'C2', 'A3', 'B3', 'C3'])
    const winningCombinations = [
        new Set(['A1', 'B1', 'C1']),
        new Set(['A2', 'B2', 'C2']),
        new Set(['A3', 'B3', 'C3']),
        new Set(['A1', 'A2', 'A3']),
        new Set(['B1', 'B2', 'B3']),
        new Set(['C1', 'C2', 'C3']),
        new Set(['A1', 'B2', 'C3']),
        new Set(['A3', 'B2', 'C1'])
    ];

    let takenTiles: Set<String> = new Set();
    let xTiles: Set<String> = new Set();
    let oTiles: Set<String> = new Set();

    // check initial move
    if (moves.length == 0) {
        res.json({
            state: "Player X Turns",
            winning_tiles: []
        });
        return;
    }

    // check length validity
    if (moves.length > 18) {
        res.json({
            state: "Illegal Move Length",
            winning_tiles: []
        });
        return;
    }

    // walk through moves
    for (let idx = 0; idx < moves.length; idx += 2) {
        const currentMove = moves.charAt(idx) + moves.charAt(idx + 1);

        // check tile existence
        if (!tiles.has(currentMove)) {
            res.json({
                state: "Illegal Unknown Move",
                winning_tiles: []
            });
            return;
        }

        // check tile availability
        if (takenTiles.has(currentMove)) {
            res.json({
                state: "Illegal Duplicate Move",
                winning_tiles: []
            });
            return;
        }

        takenTiles.add(currentMove)

        // check x turn
        if (idx / 2 % 2 == 0) {
            xTiles.add(currentMove);

            // walk through winning combinations
            for (const winningCombination of winningCombinations) {
                const winningTiles = properSubset(xTiles, winningCombination)

                // check x winning combination exists
                if (winningTiles.length != 0) {
                    // check illegal extra move
                    if ((idx + 2 < moves.length)) {
                        res.json({
                            state: "Illegal Extra Move",
                            winning_tiles: []
                        });
                        return;
                    }

                    res.json({
                        state: "Player X Wins",
                        winning_tiles: [...winningTiles]
                    });
                    return;
                }
            }

            // check draw move
            if (idx == 16) {
                res.json({
                    state: "Draw",
                    winning_tiles: []
                });
                return;
            }

            // check last move
            if (!(idx + 2 < moves.length)) {
                res.json({
                    state: "Player O Turns",
                    winning_tiles: []
                });
                return
            }

            continue
        }

        oTiles.add(currentMove)

        // walk through winning combinations
        for (const winningCombination of winningCombinations) {
            const winningTiles = properSubset(oTiles, winningCombination)

            // check o winning combination exists
            if (winningTiles.length != 0) {
                // check illegal extra move
                if ((idx + 2 < moves.length)) {
                    res.json({
                        state: "Illegal Extra Move",
                        winning_tiles: []
                    });
                    return;
                }

                res.json({
                    state: "Player O Wins",
                    winning_tiles: [...winningTiles]
                });
                return;
            }
        }

        // check last move
        if (!(idx + 2 < moves.length)) {
            res.json({
                state: "Player X Turns",
                winning_tiles: []
            });
            return;
        }
    }
}
