import PieceModel from "./PieceModel";

class Player {
  name: string;
  piece: PieceModel;
  canPut: boolean = true;
  constructor(name: string, piece: PieceModel) {
    this.name = name;
    this.piece = piece;
  }
}

export default Player;
