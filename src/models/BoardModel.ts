import CellModel from "./CellModel";
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
}

export default BoardModel;
