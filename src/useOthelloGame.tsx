import { useState } from "react";
import CellState from "./CellState";

const initializeBoard = (): CellState[][] => {
  const board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(CellState.Empty));

  board[3][3] = CellState.White;
  board[3][4] = CellState.Black;
  board[4][3] = CellState.Black;
  board[4][4] = CellState.White;

  return board;
};

const flipPiecesRight = (
  board: CellState[][],
  rowIndex: number,
  cellIndex: number,
  currentPlayer: CellState
) => {
  let canFlip = false;
  const positionsToFlip = [];
  // 右方向にあるコマをチェック
  for (let c = cellIndex + 1; c < board[rowIndex].length; c++) {
    if (board[rowIndex][c] === CellState.Empty) {
      // 空のセルに遭遇したら終了
      break;
    } else if (board[rowIndex][c] !== currentPlayer) {
      // 異なる色のコマに遭遇したら、位置を記録
      positionsToFlip.push([rowIndex, c]);
    } else {
      // 同じ色のコマに遭遇したら、ひっくり返すことができる
      canFlip = true;
      break;
    }
  }
  // ひっくり返すことができる場合、コマをひっくり返す
  if (canFlip) {
    positionsToFlip.forEach(([r, c]) => {
      board[r][c] = currentPlayer;
    });
  }
  return board;
};

export const useOthelloGame = () => {
  const [board, setBoard] = useState<CellState[][]>(initializeBoard);
  const [currentPlayer, setCurrentPlayer] = useState<CellState>(
    CellState.Black
  );

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    setBoard((prevBoard) => {
      if (prevBoard[rowIndex][cellIndex] === CellState.Empty) {
        let newBoard = prevBoard.map((row) => [...row]);
        newBoard[rowIndex][cellIndex] = CellState.Black;
        newBoard = flipPiecesRight(
          newBoard,
          rowIndex,
          cellIndex,
          CellState.Black
        );
        return newBoard;
      }
      return prevBoard;
    });
  };

  return { board, currentPlayer, handleCellClick };
};
