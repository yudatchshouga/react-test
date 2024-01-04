import BoardModel from "./BoardModel";
import PieceModel from "./PieceModel";
import Player from "./Player";
import Players from "./Players";
import Position from "./Position";

class GameModel {
  board: BoardModel;
  players: Players;
  currentPlayer: Player;

  // ゲーム初期化
  constructor() {
    // プレイヤーの設定
    this.players = new Players([
      new Player("Player1", PieceModel.Black),
      new Player("Player2", PieceModel.White),
    ]);
    // ボードを作成
    this.board = new BoardModel(8);
    // ボードに4つの駒を配置
    this.board.init();
    // 先攻プレイヤーの設定
    this.currentPlayer = this.players.getStartPlayer();
    // 先攻プレイヤーが駒を置けるかどうかのフラグを立てる
    this.setCanPut();
  }

  copy(): GameModel {
    const game = new GameModel();
    game.board = this.board.copy();
    game.players = this.players;
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

  setCanPut() {
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
