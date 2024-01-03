import PieceModel from "./PieceModel";
import Positions from "./Positions";

class CellModel {
  piece: PieceModel;
  private canPut: boolean = false;
  private flippablePositions: Positions[] = [];

  constructor(piece: PieceModel) {
    this.piece = piece;
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

  getFlippablePositions(): Positions[] {
    if (!this.canPut) {
      return [];
    }
    return this.flippablePositions;
  }

  setFlippablePositions(positions: Positions[]): void {
    this.flippablePositions = positions;
  }
}

export default CellModel;
