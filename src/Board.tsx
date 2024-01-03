import { useState } from "react";
import Cell from "./Cell";
import CellState from "./CellState";

type BoardProps = {};

const Board: React.FC<BoardProps> = () => {
  const initializeBoard = (): CellState[][] => {
    const board = Array(8)
      .fill(null)
      .map(() => Array(8).fill(CellState.Empty));

    board[3][3] = CellState.White;
    board[3][4] = CellState.Black;
    board[4][3] = CellState.Black;
    board[4][4] = CellState.White;

    return board;
  };

  const [board, setBoard] = useState<CellState[][]>(initializeBoard);

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    setBoard((prevBoard) => {
      if (prevBoard[rowIndex][cellIndex] === CellState.Empty) {
        const newBoard = prevBoard.map((row) => [...row]);
        newBoard[rowIndex][cellIndex] = CellState.Black;
        return newBoard;
      }
      return prevBoard;
    });
  };

  return (
    <div>
      {[...Array(8)].map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {[...Array(8)].map((_, cellIndex) => (
            <Cell
              key={cellIndex}
              state={board[rowIndex][cellIndex]}
              onClick={() => handleCellClick(rowIndex, cellIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
