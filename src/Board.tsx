import Cell from "./Cell";
import CellModel from "./models/CellModel";

type BoardProps = {
  board: CellModel[][];
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
              cell={board[rowIndex][cellIndex]}
              onClick={() => onCellClick(rowIndex, cellIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
