import Board from "./Board";
import GameModel from "../models/GameModel";
import { useState } from "react";
import Position from "../models/Position";

type GameProps = {};

const Game: React.FC<GameProps> = () => {
  const [game, setGame] = useState<GameModel>(new GameModel());

  const onClickCell = (position: Position) => {
    setGame((game) => {
      // positionに駒を置けるかどうか
      if (game.getCanPut(position)) {
        // gameのコピーを作成
        let _game = game.copy();
        // 駒を置いて、相手の駒をひっくり返す
        _game.putPiece(position);
        // 次のプレイヤーに交代
        _game.toNextPlayer();
        // 駒を置けるかどうかのフラグを立てる
        _game.setCanPut();
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
