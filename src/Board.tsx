import Cell from "./Cell";
import CellState from "./CellState";

type BoardProps = {
  board: CellState[][];
  onCellClick: (rowIndex: number, cellIndex: number) => void;
};

const Board: React.FC<BoardProps> = ({ board, onCellClick }) => {
  return (
    <div>
      {[...Array(8)].map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {[...Array(8)].map((_, cellIndex) => (
            <Cell
              key={cellIndex}
              state={board[rowIndex][cellIndex]}
              onClick={() => onCellClick(rowIndex, cellIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
