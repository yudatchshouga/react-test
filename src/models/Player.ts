import PieceModel from "./PieceModel";

class Player {
  name: string;
  piece: PieceModel;
  canPut: boolean = true;

  constructor(name: string, piece: PieceModel) {
    this.name = name;
    this.piece = piece;
  }

  copy(): Player {
    const player = new Player(this.name, this.piece);
    player.canPut = this.canPut;
    return player;
  }
}

export default Player;
