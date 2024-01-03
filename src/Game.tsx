import CellState from "./CellState";
import Board from "./Board";
import { useOthelloGame } from "./useOthelloGame";

type GameProps = {};

const Game: React.FC<GameProps> = () => {
  const { board, currentPlayer, handleCellClick } = useOthelloGame();

  return (
    <div>
      <p>
        Current Player: {currentPlayer === CellState.Black ? "Black" : "White"}
      </p>
      <Board board={board} onCellClick={handleCellClick} />
    </div>
  );
};

export default Game;
