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
    setGame((game) => {
      if (game.getCanPut(position)) {
        let _game = game.copy();
        _game.putPiece(position);
        _game.toNextPlayer();
        _game.setCanPutToCells();
        return _game;
      }
      return game;
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
