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

  checkPutableCells(board, PieceModel.Black);

  return board;
};

function checkPutableCells(board: CellModel[][], currentPlayer: PieceModel) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      checkPutableCell(board, currentPlayer, i, j);
    }
  }
}

function checkPutableCell(
  board: CellModel[][],
  currentPlayer: PieceModel,
  rowIndex: number,
  cellIndex: number
) {
  let cell = board[rowIndex][cellIndex];
  // セルが空でない場合、そこにはコマを置けない
  if (cell.piece !== PieceModel.None) {
    cell.canPut = false;
    return;
  }

  // 右方向をチェック
  let foundOpponent = false;
  for (let j = cellIndex + 1; j < board[rowIndex].length; j++) {
    if (board[rowIndex][j].piece === getOpponent(currentPlayer)) {
      foundOpponent = true;
    } else if (board[rowIndex][j].piece === currentPlayer && foundOpponent) {
      // 対戦相手のコマの後に現在のプレイヤーのコマがある
      cell.canPut = true;
      return;
    } else {
      break;
    }
  }

  cell.canPut = false;
  return;
}

function getOpponent(player: PieceModel): PieceModel {
  return player === PieceModel.Black ? PieceModel.White : PieceModel.Black;
}

export const useOthelloGame = () => {
  const [board, setBoard] = useState<CellModel[][]>(initializeBoard);
  const [currentPlayer, setCurrentPlayer] = useState<PieceModel>(
    PieceModel.Black
  );

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    setBoard((prevBoard) => {
      if (prevBoard[rowIndex][cellIndex].piece === PieceModel.None) {
        let newBoard = prevBoard.map((row) => [...row]);
        newBoard[rowIndex][cellIndex].piece = PieceModel.Black;
        return newBoard;
      }
      return prevBoard;
    });
  };

  return { board, currentPlayer, handleCellClick };
};
