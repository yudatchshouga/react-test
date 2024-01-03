import { useState } from "react";
import CellModel from "./models/CellModel";
import PieceModel from "./models/PieceModel";
import Positions from "./models/Positions";

const initializeBoard = (): CellModel[][] => {
  const board = Array(8)
    .fill(null)
    .map(() =>
      Array(8)
        .fill(null)
        .map(() => new CellModel(PieceModel.None))
    );

  board[3][3].piece = PieceModel.White;
  board[3][4].piece = PieceModel.Black;
  board[4][3].piece = PieceModel.Black;
  board[4][4].piece = PieceModel.White;

  setCanPutToBoard(board, PieceModel.Black);
  console.log(board);

  return board;
};

const setCanPutToBoard = (board: CellModel[][], currentPlayer: PieceModel) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      setCanPutToCell(board, currentPlayer, i, j);
    }
  }
};

const setCanPutToCell = (
  board: CellModel[][],
  currentPlayer: PieceModel,
  rowIndex: number,
  cellIndex: number
) => {
  let cell = board[rowIndex][cellIndex];

  let directions = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ];

  let canPut = directions.some((direction) =>
    canPutToDirection(board, currentPlayer, rowIndex, cellIndex, direction)
  );
  cell.setCanPut(canPut);
};

const canPutToDirection = (
  board: CellModel[][],
  currentPlayer: PieceModel,
  rowIndex: number,
  cellIndex: number,
  direction: number[]
): boolean => {
  let cell = board[rowIndex][cellIndex];
  let canPut = false;
  let dx = direction[0];
  let dy = direction[1];
  let flippablePositions: Positions[] = [];
  if (cell.piece === PieceModel.None) {
    let foundOpponent = false;
    let x = cellIndex + dx;
    let y = rowIndex + dy;

    while (x >= 0 && x < board[0].length && y >= 0 && y < board.length) {
      // 盤面の範囲内でループを続ける
      // xとyは、現在調査中のセルの座標
      if (board[y][x].piece === getOpponent(currentPlayer)) {
        // 現在のプレイヤーの対戦相手のコマが見つかった場合
        // 例: 現在のプレイヤーが黒の場合、白のコマを見つけた状況
        foundOpponent = true;
        flippablePositions.push(new Positions(x, y));
      } else if (board[y][x].piece === currentPlayer && foundOpponent) {
        // 現在のプレイヤーのコマが見つかり、かつ対戦相手のコマを既に見つけていた場合
        // これはコマを置くことができる状況を意味する
        canPut = true;
        cell.setFlippablePositions(flippablePositions);
        break;
      } else {
        // いずれの条件も満たさない場合、ループを終了
        // 例: 空のセルに遭遇したり、盤面の端に達した場合
        cell.setFlippablePositions([]);
        break;
      }

      // 次のセルへ移動
      x += dx;
      y += dy;
    }
  }

  return canPut;
};

const getOpponent = (player: PieceModel): PieceModel => {
  return player === PieceModel.Black ? PieceModel.White : PieceModel.Black;
};

export const useOthelloGame = () => {
  const [board, setBoard] = useState<CellModel[][]>(initializeBoard);
  const [currentPlayer, setCurrentPlayer] = useState<PieceModel>(
    PieceModel.Black
  );

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    setBoard((prevBoard) => {
      let prevCell = prevBoard[rowIndex][cellIndex];
      if (prevCell.piece === PieceModel.None && prevCell.getCanPut()) {
        let newBoard = prevBoard.map((row) => [...row]);
        newBoard[rowIndex][cellIndex].piece = PieceModel.Black;
        return newBoard;
      }
      return prevBoard;
    });
  };

  return { board, currentPlayer, handleCellClick };
};
