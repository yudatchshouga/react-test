import { useState, useEffect } from "react";
import Cell from "./Cell";

type GameProps = {};

const size = 4;

// 盤面の初期化
const initBoard: string[][] = Array(size)
  .fill("")
  .map(() => Array(size).fill(""));
initBoard[size / 2 - 1][size / 2 - 1] = "⚫︎";
initBoard[size / 2][size / 2] = "⚫︎";
initBoard[size / 2 - 1][size / 2] = "⚪︎";
initBoard[size / 2][size / 2 - 1] = "⚪︎";

// 置ける場所の初期化
const initPutables: boolean[][] = Array(size)
  .fill(true)
  .map(() => Array(size).fill(true));

// プレイヤーの初期化
const initPlayer: string = "⚫︎";

const Game: React.FC<GameProps> = () => {
  const [board, setBoard] = useState<string[][]>(initBoard);
  const [putables, setPutables] = useState<boolean[][]>(initPutables);
  const [player, setPlayer] = useState<string>(initPlayer);
  const [gameStatus, setGameStatus] = useState<string>("playing");

  const onClickCell = (y: number, x: number) => {
    if (putables[y][x]) {
      console.log("put");
      setBoard((prevBoard) => {
        const newBoard: string[][] = [...prevBoard];
        newBoard[y][x] = player;
        // 駒をひっくり返す処理
        // 各方向に対して処理を行う
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            // 自分自身の方向は無視する
            if (i === 0 && j === 0) continue;
            // 次に調べるセルの座標
            let nx = x + i;
            let ny = y + j;
            // 白の駒が続く限り、セルを進める
            while (
              nx >= 0 &&
              nx < size &&
              ny >= 0 &&
              ny < size &&
              newBoard[ny][nx] === (player === "⚫︎" ? "⚪︎" : "⚫︎")
            ) {
              nx += i;
              ny += j;
            }
            // セルが盤面内にあり、黒の駒がある場合
            if (
              nx >= 0 &&
              nx < size &&
              ny >= 0 &&
              ny < size &&
              newBoard[ny][nx] === player
            ) {
              // 黒の駒に戻るまで、セルを戻す
              nx -= i;
              ny -= j;
              while (nx !== x || ny !== y) {
                // 駒を黒に変える
                newBoard[ny][nx] = player;
                nx -= i;
                ny -= j;
              }
            }
          }
        }
        return newBoard;
      });
      // ターン交代
      setPlayer((prevPlayer) => (prevPlayer === "⚫︎" ? "⚪︎" : "⚫︎"));
    }
  };

  // プレイヤー交代したら置ける場所を更新する
  useEffect(() => {
    // 置ける場所を探す
    setPutables(() => calculatePutables(board, player));
  }, [player]);

  // putablesが全てfalseだったら
  useEffect(() => {
    // ゲームオーバー判定
    const nextPlayer = player === "⚫︎" ? "⚪︎" : "⚫︎";
    const nextPutables = calculatePutables(board, nextPlayer);
    if (
      putables.every((row) => row.every((putable) => !putable)) &&
      nextPutables.every((row) => row.every((putable) => !putable))
    ) {
      setGameStatus("gameover");
      return;
    }

    // パス判定
    if (putables.every((row) => row.every((putable) => !putable))) {
      setGameStatus("pass");
      setTimeout(() => {
        // ターン交代
        setPlayer((prevPlayer) => (prevPlayer === "⚫︎" ? "⚪︎" : "⚫︎"));
        setGameStatus("playing");
      }, 1000);
    }
  }, [putables]);

  // 置ける場所を計算する関数
  const calculatePutables = (
    board: string[][],
    player: string
  ): boolean[][] => {
    const newPutables: boolean[][] = [];
    // 盤面を初期化
    for (let i = 0; i < size; i++) {
      newPutables[i] = [false, false, false, false];
    }
    // 置ける場所を探す
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // 既に駒が置かれている場合は無視する
        if (board[i][j] !== "") continue;
        // 各方向に対して処理を行う
        for (let k = -1; k <= 1; k++) {
          for (let l = -1; l <= 1; l++) {
            // 自分自身の方向は無視する
            if (k === 0 && l === 0) continue;
            // 次に調べるセルの座標
            let nx = j + k;
            let ny = i + l;
            // 盤面外の場合は無視する
            if (nx < 0 || nx >= size || ny < 0 || ny >= size) continue;
            // 隣のセルが相手の駒でない場合は無視する
            if (board[ny][nx] !== (player === "⚫︎" ? "⚪︎" : "⚫︎")) continue;
            // 隣のセルが相手の駒の場合、さらにその先を調べる
            while (true) {
              nx += k;
              ny += l;
              // 盤面外の場合は無視する
              if (nx < 0 || nx >= size || ny < 0 || ny >= size) break;
              // 隣のセルが空白の場合は無視する
              if (board[ny][nx] === "") break;
              // 隣のセルが自分の駒の場合、置ける場所としてマークする
              if (board[ny][nx] === player) {
                newPutables[i][j] = true;
                break;
              }
            }
          }
        }
      }
    }
    return newPutables;
  };

  return (
    <div>
      {gameStatus === "playing" && <div>現在のプレイヤー: {player}</div>}
      {gameStatus === "pass" && <div>パス</div>}
      {gameStatus === "gameover" && <div>ゲームオーバー</div>}
      {[...Array(size)].map((_, y) => (
        <div style={{ display: "flex" }} key={y}>
          {[...Array(size)].map((_, x) => (
            <Cell
              key={x}
              content={board[y][x]}
              onClick={() => onClickCell(y, x)}
              puttable={putables[y][x]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Game;
