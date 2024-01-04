import { DIRECTIONS } from "../constants/Directions";
import CellModel from "./CellModel";
import Direction from "./Direction";
import PieceModel from "./PieceModel";
import Player from "./Player";
import Position from "./Position";

class BoardModel {
  cells: CellModel[][];
  size: number;

  constructor(size: number) {
    this.cells = Array(size)
      .fill(null)
      .map(() =>
        Array(size)
          .fill(null)
          .map(() => new CellModel())
      );
    this.size = size;
    this.init();
  }

  init() {
    const size = this.size;
    this.getCell(new Position(size / 2 - 1, size / 2 - 1)).piece =
      PieceModel.Black;
    this.getCell(new Position(size / 2 - 1, size / 2)).piece = PieceModel.White;
    this.getCell(new Position(size / 2, size / 2 - 1)).piece = PieceModel.White;
    this.getCell(new Position(size / 2, size / 2)).piece = PieceModel.Black;
  }

  getCell(position: Position): CellModel {
    if (
      position.x < 0 ||
      position.x >= this.cells.length ||
      position.y < 0 ||
      position.y >= this.cells[0].length
    ) {
      throw new Error("Position is out of bounds");
    }
    return this.cells[position.y][position.x];
  }

  // コピーメソッド
  copy(): BoardModel {
    const board = new BoardModel(this.size);
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        board.cells[y][x] = this.cells[y][x].copy();
      }
    }
    return board;
  }

  setCanPutToCells(currentPlayer: Player) {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        let position = new Position(x, y);
        this.setCanPutToCell(currentPlayer, position);
      }
    }
  }

  setCanPutToPlayer(currentPlayer: Player) {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        let position = new Position(x, y);
        let cell = this.getCell(position);
        if (cell.getCanPut()) {
          currentPlayer.canPut = true;
          return;
        }
      }
    }
    currentPlayer.canPut = false;
  }

  setCanPutToCell(currentPlayer: Player, position: Position) {
    let cell = this.getCell(position);
    let allFlippablePositions: Position[] = [];

    DIRECTIONS.forEach((direction) => {
      let flippablePositions = this.getFlippablePositionsInDirection(
        currentPlayer,
        position,
        direction
      );

      if (flippablePositions.length > 0) {
        allFlippablePositions.push(...flippablePositions);
      }
    });

    const canPut = allFlippablePositions.length > 0;
    cell.setCanPut(canPut);
    if (canPut) {
      cell.setFlippablePositions(allFlippablePositions);
    }
  }

  getFlippablePositionsInDirection = (
    currentPlayer: Player,
    position: Position,
    direction: Direction
  ): Position[] => {
    let cell = this.getCell(position);
    let flippablePositions: Position[] = [];
    if (cell.piece === PieceModel.None) {
      let foundOpponent = false;
      position = position.addDirection(direction);
      while (position.isVaild(this.size)) {
        // 盤面の範囲内でループを続ける
        // xとyは、現在調査中のセルの座標
        if (this.existsOtherPiece(position, currentPlayer)) {
          // 現在のプレイヤーの対戦相手のコマが見つかった場合
          // 例: 現在のプレイヤーが黒の場合、白のコマを見つけた状況
          foundOpponent = true;
          flippablePositions.push(position);
        } else if (
          this.getCell(position).piece === currentPlayer.piece &&
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

  existsOtherPiece(position: Position, currentPlayer: Player) {
    return (
      this.getCell(position).piece !== PieceModel.None &&
      this.getCell(position).piece !== currentPlayer.piece
    );
  }
}

export default BoardModel;
