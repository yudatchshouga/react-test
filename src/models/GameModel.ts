import BoardModel from "./BoardModel";
import Player from "./Player";
import Players from "./Players";
import Position from "./Position";

class GameModel {
  board: BoardModel;
  players: Players;
  currentPlayer: Player;

  constructor(size: number, players: Players) {
    this.board = new BoardModel(size);
    this.players = players;
    this.currentPlayer = players.getStartPlayer();
  }

  copy(): GameModel {
    const game = new GameModel(this.board.size, this.players);
    game.board = this.board.copy();
    game.currentPlayer = this.currentPlayer;
    return game;
  }

  putPiece(position: Position) {
    const cell = this.board.getCell(position);
    const flippablePositions = cell.getFlippablePositions();
    if (flippablePositions.length === 0) {
      return;
    }
    cell.piece = this.currentPlayer.piece;
    flippablePositions.map((position) => {
      this.board.getCell(position).piece = this.currentPlayer.piece;
    });
  }

  setCanPutToCells() {
    this.board.setCanPutToCells(this.currentPlayer);
    this.board.setCanPutToPlayer(this.currentPlayer);
  }

  toNextPlayer() {
    this.currentPlayer = this.players.getNextPlayer(this.currentPlayer);
  }

  getCanPut(position: Position): boolean {
    return this.board.getCell(position).getCanPut();
  }
}

export default GameModel;
