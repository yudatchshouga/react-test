import { DIRECTIONS } from "../constants/Directions";
import BoardModel from "./BoardModel";
import Direction from "./Direction";
import Player from "./Player";
import Players from "./Players";
import Position from "./Position";

class GameModel {
  size: number = 8;
  board: BoardModel;
  players: Players;
  currentPlayer: Player;
  isOver: boolean = false;

  // ゲーム初期化
  constructor() {
    // プレイヤーの設定
    this.players = new Players([
      new Player("Player1", "Black"),
      new Player("Player2", "White"),
    ]);
    // ボードを作成
    this.board = new BoardModel(this.size);
    // ボードに4つの駒を配置
    this.init();
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

  init() {
    this.board.cells[3][3] = "Black";
    this.board.cells[3][4] = "White";
    this.board.cells[4][3] = "White";
    this.board.cells[4][4] = "Black";
  }

  // 駒を置いて、相手の駒をひっくり返す
  putPiece(position: Position) {
    // 自分の駒を置く場所を取得
    const cell = this.board.getCell(position);
    console.log(cell);
    // 駒を置く
    this.board.cells[position.y][position.x] = this.currentPlayer.piece;
    // 駒をひっくり返す
    this.reversePieces(position);
  }

  // 駒をひっくり返す
  reversePieces(position: Position) {
    // 8方向の駒をひっくり返す
    DIRECTIONS.forEach((direction) => {
      this.reversePiecesInDirection(position, direction);
    });
  }

  // direction方向の駒をひっくり返す
  reversePiecesInDirection(position: Position, direction: Direction) {
    // direction方向のひっくり返せる駒を取得
    const reversibles = this.getReversibles(position, direction);
    // ひっくり返せる駒をひっくり返す
    for (let i = 0; i < reversibles.length; i++) {
      this.reversePiece(reversibles[i]);
    }
  }

  // 駒をひっくり返す
  reversePiece(position: Position) {
    this.board.cells[position.y][position.x] = this.currentPlayer.piece;
  }

  // 駒を置けるかどうかのフラグを立てる
  setCanPut() {
    // 駒を置けるかどうかのフラグをセルに立てる
    this.setCanPutToCells();
  }

  // 駒を置けるかどうかのフラグをセルに立てる
  setCanPutToCells() {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        let position = new Position(x, y);
      }
    }
  }

  getReversibles = (position: Position, direction: Direction): Position[] => {
    console.log("getReversibles");
    let cell = this.board.getCell(position);
    let reversibles: Position[] = [];
    if (cell === "None") {
      let foundOpponent = false;
      position = position.addDirection(direction);
      while (position.isVaild(this.size)) {
        console.log("loop");
        // 盤面の範囲内でループを続ける
        // xとyは、現在調査中のセルの座標
        if (this.existsOtherPiece(position)) {
          // 現在のプレイヤーの対戦相手のコマが見つかった場合
          // 例: 現在のプレイヤーが黒の場合、白のコマを見つけた状況
          foundOpponent = true;
          reversibles.push(position);
        } else if (
          this.board.getCell(position) === this.currentPlayer.piece &&
          foundOpponent
        ) {
          // 現在のプレイヤーのコマが見つかり、かつ対戦相手のコマを既に見つけていた場合
          // これはコマを置くことができる状況を意味する
          return reversibles;
        } else {
          // いずれの条件も満たさない場合、ループを終了
          // 例: 空のセルに遭遇したり、盤面の端に達した場合
          break;
        }
        // 次のセルへ移動
        position = position.addDirection(direction);
      }
    }

    return [];
  };

  // 現在のプレイヤー以外の駒があるかどうか
  existsOtherPiece(position: Position) {
    return (
      this.board.getCell(position) !== "None" &&
      this.board.getCell(position) !== this.currentPlayer.piece
    );
  }

  // 駒を置けるかどうかのフラグをプレイヤーに立てる

  // 次のプレイヤーに交代
  toNextPlayer() {
    this.currentPlayer = this.players.getNextPlayer(this.currentPlayer);
  }

  // positionに駒を置けるかどうか
  canPut(position: Position): boolean {
    return this.board.getCell(position) === "None";
  }

  setIsOver() {
    // 両プレイヤーが駒を置けない場合
    if (!this.players.players[0].canPut && !this.players.players[1].canPut) {
      this.isOver = true;
    }
  }
}

export default GameModel;
