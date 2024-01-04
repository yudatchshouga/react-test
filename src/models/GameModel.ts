import BoardModel from "./BoardModel";
import PieceModel from "./PieceModel";
import Position from "./Position";

class GameModel {
  board: BoardModel;
  currentPlayer: PieceModel;

  constructor(size: number) {
    this.board = new BoardModel(size);
    this.currentPlayer = PieceModel.Black;
  }

  copy(): GameModel {
    const game = new GameModel(this.board.size);
    game.board = this.board.copy();
    game.currentPlayer = this.currentPlayer;
    return game;
  }

  putPiece(position: Position, currentPlayer: PieceModel) {
    const cell = this.board.getCell(position);
    const flippablePositions = cell.getFlippablePositions();
    if (flippablePositions.length === 0) {
      return;
    }
    cell.piece = currentPlayer;
    flippablePositions.map((position) => {
      this.board.getCell(position).piece = currentPlayer;
    });
  }

  getOpponent(player: PieceModel): PieceModel {
    return player === PieceModel.Black ? PieceModel.White : PieceModel.Black;
  }
}

export default GameModel;
