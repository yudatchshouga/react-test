import Cell from "./Cell";
import CellState from "./CellState";

const Board = () => {
  const board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(CellState.Empty));

  board[3][3] = CellState.Black;
  board[3][4] = CellState.White;
  board[4][3] = CellState.White;
  board[4][4] = CellState.Black;

  console.log(board);

  return (
    <div>
      {[...Array(8)].map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {[...Array(8)].map((_, cellIndex) => (
            <Cell key={cellIndex} state={board[rowIndex][cellIndex]} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
