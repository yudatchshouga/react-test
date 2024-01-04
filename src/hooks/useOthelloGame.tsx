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
        let game = prevGame.copy();
        game.putPiece(position, currentPlayer);
        // 次のプレイヤー
        const nextPlayer = game.board.getOpponent(currentPlayer);
        setCurrentPlayer(nextPlayer);
        game.board.setCanPutToBoard(nextPlayer);
        return game;
      }
      return prevGame;
    });
  };

  return { game, currentPlayer, onClickCell };
};
