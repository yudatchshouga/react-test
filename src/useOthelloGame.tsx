import { useState } from "react";
import PieceModel from "./models/PieceModel";
import Position from "./models/Position";
import BoardModel from "./models/BoardModel";

const initializeBoard = (): BoardModel => {
  const board = new BoardModel(8);

  board.getCell(new Position(3, 3)).piece = PieceModel.White;
  board.getCell(new Position(3, 4)).piece = PieceModel.Black;
  board.getCell(new Position(4, 3)).piece = PieceModel.Black;
  board.getCell(new Position(4, 4)).piece = PieceModel.White;

  setCanPutToBoard(board, PieceModel.Black);
  console.log(board.cells);

  return board;
};

const setCanPutToBoard = (board: BoardModel, currentPlayer: PieceModel) => {
  for (let i = 0; i < board.size; i++) {
    for (let j = 0; j < board.size; j++) {
      setCanPutToCell(board, currentPlayer, i, j);
    }
  }
};

const setCanPutToCell = (
  board: BoardModel,
  currentPlayer: PieceModel,
  rowIndex: number,
  cellIndex: number
) => {
  let cell = board.cells[rowIndex][cellIndex];

  let directions = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ];

  let canPut = directions.some((direction) =>
    canPutToDirection(board, currentPlayer, rowIndex, cellIndex, direction)
  );
  cell.setCanPut(canPut);
};

const canPutToDirection = (
  board: BoardModel,
  currentPlayer: PieceModel,
  rowIndex: number,
  cellIndex: number,
  direction: number[]
): boolean => {
  let cell = board.cells[rowIndex][cellIndex];
  let canPut = false;
  let dx = direction[0];
  let dy = direction[1];
  let flippablePositions: Position[] = [];
  if (cell.piece === PieceModel.None) {
    let foundOpponent = false;
    let x = cellIndex + dx;
    let y = rowIndex + dy;

    let position = new Position(x, y);

    while (position.isVaild(board.size)) {
      // 盤面の範囲内でループを続ける
      // xとyは、現在調査中のセルの座標
      if (board.getCell(position).piece === getOpponent(currentPlayer)) {
        // 現在のプレイヤーの対戦相手のコマが見つかった場合
        // 例: 現在のプレイヤーが黒の場合、白のコマを見つけた状況
        foundOpponent = true;
        flippablePositions.push(new Position(x, y));
      } else if (
        board.getCell(position).piece === currentPlayer &&
        foundOpponent
      ) {
        // 現在のプレイヤーのコマが見つかり、かつ対戦相手のコマを既に見つけていた場合
        // これはコマを置くことができる状況を意味する
        canPut = true;
        cell.setFlippablePositions(flippablePositions);
        break;
      } else {
        // いずれの条件も満たさない場合、ループを終了
        // 例: 空のセルに遭遇したり、盤面の端に達した場合
        cell.setFlippablePositions([]);
        break;
      }

      // 次のセルへ移動
      position = new Position(position.x + dx, position.y + dy);
    }
  }

  return canPut;
};

const getOpponent = (player: PieceModel): PieceModel => {
  return player === PieceModel.Black ? PieceModel.White : PieceModel.Black;
};

export const useOthelloGame = () => {
  const [board, setBoard] = useState<BoardModel>(initializeBoard);
  const [currentPlayer, setCurrentPlayer] = useState<PieceModel>(
    PieceModel.Black
  );

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    setBoard((prevBoard) => {
      let x = cellIndex;
      let y = rowIndex;
      let position = new Position(x, y);
      let selectedCell = prevBoard.getCell(position);
      if (selectedCell.getCanPut()) {
        let newBoard = prevBoard.copy();
        newBoard.putPiece(position, currentPlayer);
        setCanPutToBoard(newBoard, getOpponent(currentPlayer));
        return newBoard;
      }
      return prevBoard;
    });
  };

  return { board, currentPlayer, handleCellClick };
};
