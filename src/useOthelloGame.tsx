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

  board[2][3].canPut = true;

  console.log(board);

  return board;
};

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
