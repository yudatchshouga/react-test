import PieceModel from "./PieceModel";
import Position from "./Position";

class CellModel {
  piece: PieceModel;
  private reversibles: Position[] = [];

  constructor(piece?: PieceModel) {
    this.piece = piece || PieceModel.None;
  }

  copy(): CellModel {
    const cell = new CellModel(this.piece);
    cell.reversibles = this.reversibles;
    return cell;
  }

  getCanPut(): boolean {
    if (this.piece !== PieceModel.None) {
      return false;
    }
    return this.reversibles.length > 0;
  }

  getReversibles(): Position[] {
    return this.reversibles;
  }

  setReversibles(reversibles: Position[]): void {
    this.reversibles = reversibles;
  }
}

export default CellModel;
