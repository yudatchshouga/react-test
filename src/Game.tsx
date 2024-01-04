import Board from "./Board";
import PieceModel from "./models/PieceModel";
import { useOthelloGame } from "./useOthelloGame";

type GameProps = {};

const Game: React.FC<GameProps> = () => {
  const { board, currentPlayer, handleCellClick } = useOthelloGame();

  return (
    <div>
      <p>
        Current Player: {currentPlayer === PieceModel.Black ? "Black" : "White"}
      </p>
      <Board board={board.cells} onCellClick={handleCellClick} />
    </div>
  );
};

export default Game;
