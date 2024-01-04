import Board from "./Board";
import PieceModel from "../models/PieceModel";
import Player from "../models/Player";
import GameModel from "../models/GameModel";
import { useState } from "react";
import Position from "../models/Position";
import Players from "../models/Players";

type GameProps = {};

const Game: React.FC<GameProps> = () => {
  const players: Players = new Players([
    new Player("Player1", PieceModel.Black),
    new Player("Player2", PieceModel.White),
  ]);

  const [game, setGame] = useState<GameModel>(new GameModel(8, players));

  const onClickCell = (position: Position) => {
    setGame((prevGame) => {
      if (prevGame.getCanPut(position)) {
        let game = prevGame.copy();
        game.putPiece(position);
        game.toNextPlayer();
        game.setCanPutToBoard();
        return game;
      }
      return prevGame;
    });
  };

  return (
    <div>
      <p>
        Current Player: {game.currentPlayer.name}, canPut:
        {game.currentPlayer.canPut.toString()}
      </p>
      {!game.currentPlayer.canPut && <p>GAMEOVER</p>}
      <Board board={game.board} onClickCell={onClickCell} />
    </div>
  );
};

export default Game;
