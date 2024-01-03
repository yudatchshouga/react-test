import PieceModel from "./PieceModel";

class CellModel {
  piece: PieceModel;
  canPut: boolean = false;
  constructor(piece: PieceModel) {
    this.piece = piece;
  }
}

export default CellModel;
