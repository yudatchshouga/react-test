import PieceModel from "./PieceModel";

class CellModel {
  piece: PieceModel;
  private canPut: boolean = false;
  private flippablePositions: number[][] = [];

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

  getFlippablePositions(): number[][] {
    if (!this.canPut) {
      return [];
    }
    return this.flippablePositions;
  }

  setFlippablePositions(positions: number[][]): void {
    this.flippablePositions = positions;
  }
}

export default CellModel;
