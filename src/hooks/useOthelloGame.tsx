import { useState } from "react";
import PieceModel from "../models/PieceModel";
import Position from "../models/Position";
import BoardModel from "../models/BoardModel";

export const useOthelloGame = () => {
  const [board, setBoard] = useState<BoardModel>(new BoardModel(8));
  const [currentPlayer, setCurrentPlayer] = useState<PieceModel>(
    PieceModel.Black
  );

  const onClickCell = (position: Position) => {
    setBoard((prevBoard) => {
      let selectedCell = prevBoard.getCell(position);
      if (selectedCell.getCanPut()) {
        let newBoard = prevBoard.copy();
        newBoard.putPiece(position, currentPlayer);
        newBoard.setCanPutToBoard(newBoard.getOpponent(currentPlayer));
        setCurrentPlayer(newBoard.getOpponent(currentPlayer));
        console.log(newBoard.cells);
        return newBoard;
      }
      return prevBoard;
    });
  };

  return { board, currentPlayer, onClickCell };
};
