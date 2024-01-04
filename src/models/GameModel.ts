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
}

export default GameModel;
