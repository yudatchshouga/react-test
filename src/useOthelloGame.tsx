import { useState } from "react";
import CellModel from "./models/CellModel";
import PieceModel from "./models/PieceModel";

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
  if (cell.piece === PieceModel.None) {
    let foundOpponent = false;
    let x = cellIndex + dx;
    let y = rowIndex + dy;

    while (x >= 0 && x < board[0].length && y >= 0 && y < board.length) {
      if (board[y][x].piece === getOpponent(currentPlayer)) {
        foundOpponent = true;
      } else if (board[y][x].piece === currentPlayer && foundOpponent) {
        canPut = true;
        break;
      } else {
        break;
      }

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
