import { useState } from "react";
import PieceModel from "./models/PieceModel";
import Position from "./models/Position";
import BoardModel from "./models/BoardModel";
import { DIRECTIONS } from "./constants/Directions";
import Direction from "./models/Direction";

const initializeBoard = (): BoardModel => {
  const board = new BoardModel(8);
  setCanPutToBoard(board, PieceModel.Black);
  return board;
};

const setCanPutToBoard = (board: BoardModel, currentPlayer: PieceModel) => {
  for (let y = 0; y < board.size; y++) {
    for (let x = 0; x < board.size; x++) {
      let position = new Position(x, y);
      setCanPutToCell(board, currentPlayer, position);
    }
  }
};

const setCanPutToCell = (
  board: BoardModel,
  currentPlayer: PieceModel,
  position: Position
) => {
  let cell = board.getCell(position);
  let allFlippablePositions: Position[] = [];
  let canPut = false;

  DIRECTIONS.forEach((direction) => {
    let flippablePositions = canPutToDirection(
      board,
      currentPlayer,
      position,
      direction
    );

    if (flippablePositions.length > 0) {
      allFlippablePositions.push(...flippablePositions);
      canPut = true; // 少なくとも一つの方向でコマを置くことができる
    }
  });

  cell.setCanPut(canPut);
  if (canPut) {
    cell.setFlippablePositions(allFlippablePositions);
    console.log(allFlippablePositions);
  }
};

const canPutToDirection = (
  board: BoardModel,
  currentPlayer: PieceModel,
  position: Position,
  direction: Direction
): Position[] => {
  let cell = board.getCell(position);
  let flippablePositions: Position[] = [];
  if (cell.piece === PieceModel.None) {
    let foundOpponent = false;
    position = position.addDirection(direction);
    while (position.isVaild(board.size)) {
      // 盤面の範囲内でループを続ける
      // xとyは、現在調査中のセルの座標
      if (board.getCell(position).piece === getOpponent(currentPlayer)) {
        // 現在のプレイヤーの対戦相手のコマが見つかった場合
        // 例: 現在のプレイヤーが黒の場合、白のコマを見つけた状況
        foundOpponent = true;
        flippablePositions.push(position);
      } else if (
        board.getCell(position).piece === currentPlayer &&
        foundOpponent
      ) {
        // 現在のプレイヤーのコマが見つかり、かつ対戦相手のコマを既に見つけていた場合
        // これはコマを置くことができる状況を意味する
        return flippablePositions;
      } else {
        // いずれの条件も満たさない場合、ループを終了
        // 例: 空のセルに遭遇したり、盤面の端に達した場合
        break;
      }
      // 次のセルへ移動
      position = position.addDirection(direction);
    }
  }

  return [];
};

const getOpponent = (player: PieceModel): PieceModel => {
  return player === PieceModel.Black ? PieceModel.White : PieceModel.Black;
};

export const useOthelloGame = () => {
  const [board, setBoard] = useState<BoardModel>(initializeBoard);
  const [currentPlayer, setCurrentPlayer] = useState<PieceModel>(
    PieceModel.Black
  );

  const onClickCell = (position: Position) => {
    setBoard((prevBoard) => {
      let selectedCell = prevBoard.getCell(position);
      if (selectedCell.getCanPut()) {
        let newBoard = prevBoard.copy();
        newBoard.putPiece(position, currentPlayer);
        setCanPutToBoard(newBoard, getOpponent(currentPlayer));
        setCurrentPlayer(getOpponent(currentPlayer));
        console.log(newBoard.cells);
        return newBoard;
      }
      return prevBoard;
    });
  };

  return { board, currentPlayer, onClickCell };
};
