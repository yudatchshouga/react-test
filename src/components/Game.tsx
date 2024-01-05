import Board from "./Board";
import GameModel from "../models/GameModel";
import { useEffect, useState } from "react";
import Position from "../models/Position";

type GameProps = {};

const Game: React.FC<GameProps> = () => {
  const [game, setGame] = useState<GameModel>(new GameModel());

  useEffect(() => {
    if (!game.currentPlayer.canPut) {
      const timer = setTimeout(() => {
        setGame((prevGame) => {
          let _game = prevGame.copy();
          _game.toNextPlayer();
          _game.setCanPut();
          _game.setIsOver();
          return _game;
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [game.currentPlayer.canPut]);

  const onClickCell = (position: Position) => {
    setGame((game) => {
      // positionに駒を置けるかどうか
      if (game.canPut(position)) {
        // gameのコピーを作成
        let _game = game.copy();
        // console.log("copy done");
        // 駒を置いて、相手の駒をひっくり返す
        _game.putPiece(position);
        console.log("put done");
        // 次のプレイヤーに交代
        _game.toNextPlayer();
        // console.log("next done");
        // 駒を置けるかどうかのフラグを立てる
        _game.setCanPut();
        // console.log("canPut done");
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
      {!game.currentPlayer.canPut && <p>PASS</p>}
      {game.isOver && <p>GAME OVER</p>}
      <Board board={game.board} onClickCell={onClickCell} />
    </div>
  );
};

export default Game;
