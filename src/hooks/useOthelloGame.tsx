import { useState } from "react";
import PieceModel from "../models/PieceModel";
import Position from "../models/Position";
import GameModel from "../models/GameModel";

export const useOthelloGame = () => {
  const [game, setGame] = useState<GameModel>(new GameModel(8));
  const [currentPlayer, setCurrentPlayer] = useState<PieceModel>(
    PieceModel.Black
  );

  const onClickCell = (position: Position) => {
    setGame((prevGame) => {
      if (prevGame.board.getCell(position).getCanPut()) {
        let newGame = new GameModel(prevGame.board.size);
        newGame.board = prevGame.board.copy();
        newGame.putPiece(position, currentPlayer);
        newGame.board.setCanPutToBoard(newGame.board.getOpponent(currentPlayer));
        setCurrentPlayer(newGame.board.getOpponent(currentPlayer));
        return newGame;
      }
      return prevGame;
    });
  };

  return { game, currentPlayer, onClickCell };
};
