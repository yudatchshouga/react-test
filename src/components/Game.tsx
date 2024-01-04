import Board from "./Board";
import PieceModel from "../models/PieceModel";
import { useOthelloGame } from "../hooks/useOthelloGame";

type GameProps = {};

const Game: React.FC<GameProps> = () => {
  const { game, currentPlayer, onClickCell } = useOthelloGame();

  return (
    <div>
      <p>
        Current Player: {currentPlayer === PieceModel.Black ? "Black" : "White"}
      </p>
      <Board board={game.board} onClickCell={onClickCell} />
    </div>
  );
};

export default Game;
