import Cell from "./Cell";
import BoardModel from "../models/BoardModel";
import Position from "../models/Position";

type BoardProps = {
  board: BoardModel;
  onClickCell: (position: Position) => void;
};

const Board: React.FC<BoardProps> = ({ board, onClickCell }) => {
  return (
    <div>
      {[...Array(8)].map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {[...Array(8)].map((_, cellIndex) => {
            const position = new Position(cellIndex, rowIndex);
            return (
              <Cell
                key={cellIndex}
                cell={board.getCell(position)}
                onClick={() => onClickCell(position)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
