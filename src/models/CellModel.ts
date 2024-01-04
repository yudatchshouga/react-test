import PieceModel from "./PieceModel";
import Position from "./Position";

class CellModel {
  piece: PieceModel;
  private canPut: boolean = false;
  private flippablePositions: Position[] = [];

  constructor(piece?: PieceModel) {
    this.piece = piece || PieceModel.None;
  }

  getCanPut(): boolean {
    if (this.piece !== PieceModel.None) {
      return false;
    }
    return this.canPut;
  }

  setCanPut(canPut: boolean): void {
    this.canPut = canPut;
  }

  getFlippablePositions(): Position[] {
    if (!this.canPut) {
      return [];
    }
    return this.flippablePositions;
  }

  setFlippablePositions(positions: Position[]): void {
    this.flippablePositions = positions;
  }

  // コピーメソッド
  copy(): CellModel {
    const cell = new CellModel(this.piece);
    cell.canPut = this.canPut;
    cell.flippablePositions = this.flippablePositions;
    return cell;
  }
}

export default CellModel;
