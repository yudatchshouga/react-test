import CellModel from "./CellModel";
import PieceModel from "./PieceModel";
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
          .map(() => new CellModel(PieceModel.None))
      );
    this.size = size;
    this.getCell(new Position(size / 2 - 1, size / 2 - 1)).piece =
      PieceModel.Black;
    this.getCell(new Position(size / 2 - 1, size / 2)).piece = PieceModel.White;
    this.getCell(new Position(size / 2, size / 2 - 1)).piece = PieceModel.White;
    this.getCell(new Position(size / 2, size / 2)).piece = PieceModel.Black;
  }

  getCells(): CellModel[][] {
    return this.cells;
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

  putPiece(position: Position, currentPlayer: PieceModel) {
    const cell = this.getCell(position);
    const flippablePositions = cell.getFlippablePositions();
    if (flippablePositions.length === 0) {
      return;
    }
    cell.piece = currentPlayer;
    flippablePositions.map((position) => {
      this.getCell(position).piece = currentPlayer;
    });
  }
}

export default BoardModel;
