import { useState } from "react";
import Cell from "./Cell";

type GameProps = {};

const initBoard: string[][] = [
  ["", "", "", ""],
  ["", "b", "w", ""],
  ["", "w", "b", ""],
  ["", "", "", ""],
];

const initPutables: boolean[][] = [
  [false, false, true, false],
  [false, false, false, true],
  [true, false, false, false],
  [false, true, false, false],
];

const initPlayer: string = "b";

const Game: React.FC<GameProps> = () => {
  const [board, setBoard] = useState<string[][]>(initBoard);
  const [putables, setPutables] = useState<boolean[][]>(initPutables);
  const [player, setPlayer] = useState<string>(initPlayer);

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
              nx < 4 &&
              ny >= 0 &&
              ny < 4 &&
              newBoard[ny][nx] === (player === "b" ? "w" : "b")
            ) {
              nx += i;
              ny += j;
            }
            // セルが盤面内にあり、黒の駒がある場合
            if (
              nx >= 0 &&
              nx < 4 &&
              ny >= 0 &&
              ny < 4 &&
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
      putables[y][x] = false;
      // ターン交代
      setPlayer((prevPlayer) => (prevPlayer === "b" ? "w" : "b"));
      console.log("player", player);
      // 置ける場所を探す
      setPutables((prevPutables) => {
        const newPutables: boolean[][] = [...prevPutables];
        // 盤面を初期化
        for (let i = 0; i < 4; i++) {
          newPutables[i] = [false, false, false, false];
        }
        // 置ける場所を探す
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
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
                if (nx < 0 || nx >= 4 || ny < 0 || ny >= 4) continue;
                // 隣のセルが相手の駒でない場合は無視する
                if (board[ny][nx] !== (player === "b" ? "w" : "b")) continue;
                // 隣のセルが相手の駒の場合、さらにその先を調べる
                while (true) {
                  nx += k;
                  ny += l;
                  // 盤面外の場合は無視する
                  if (nx < 0 || nx >= 4 || ny < 0 || ny >= 4) break;
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
      });
    }
  };

  return (
    <div>
      <div>現在のプレイヤー: {player}</div>
      {[...Array(4)].map((_, y) => (
        <div style={{ display: "flex" }} key={y}>
          {[...Array(4)].map((_, x) => (
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
