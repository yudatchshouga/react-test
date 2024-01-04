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

  const startPlayer = players.getStartPlayer();

  const [game, setGame] = useState<GameModel>(new GameModel(8, startPlayer));

  const onClickCell = (position: Position) => {
    setGame((prevGame) => {
      if (prevGame.board.getCell(position).getCanPut()) {
        let game = prevGame.copy();
        const currentPlayer = game.currentPlayer;
        game.putPiece(position, currentPlayer.piece);

        const nextPlayer = players.getNextPlayer(currentPlayer);
        game.currentPlayer = nextPlayer;
        game.board.setCanPutToBoard(nextPlayer);
        game.board.setCanPutToPlayer(nextPlayer);

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
