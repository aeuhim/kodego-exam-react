'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './page.module.css'

interface IBoard {
  state: String,
  winning_tiles: Array<String>
}

export default function Home() {
  const [moves, setMoves] = useState<String>("")
  const [board, setBoard] = useState<IBoard>({ state: "", winning_tiles: [] });

  useEffect(() => {
    const url = '/api/evaluate'
    axios.post<IBoard>(url, { moves }).then((res) => {
      setBoard(res.data)
    })
  }, [moves]);

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>{board.state}</h1>
      </div>
      <div className={styles.board}>
        {['A1', 'B1', 'C1', 'A2', 'B2', 'C2', 'A3', 'B3', 'C3'].map((tile) => {
          if (moves.includes(tile)) {
            return (
              <div key={tile} className={styles.tile}>
                {
                  moves.indexOf(tile) % 4 == 0 ?
                    <span className={board.winning_tiles.includes(tile) ? styles.winner : styles.playerX}>X</span> :
                    <span className={board.winning_tiles.includes(tile) ? styles.winner : styles.playerO}>O</span>
                }
              </div>
            );
          }

          if (board.winning_tiles.length != 0) {
            return (
              <div key={tile} className={styles.tile}></div>
            );
          }

          return (
            <div key={tile} className={styles.tile} onClick={() => { setMoves(moves + tile) }}></div>
          );
        })}
      </div>
      <div className={styles.grid}>
        <div className={styles.card} onClick={() => { setMoves("") }}>
          <h2>
            New Game <span>-&gt;</span>
          </h2>
          <p>Start a new game.</p>
        </div>
      </div>
    </main>
  );
}
