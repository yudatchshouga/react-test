import { DIRECTIONS } from "../constants/Directions";
import BoardModel from "./BoardModel";
import Direction from "./Direction";
import PieceModel from "./PieceModel";
import Player from "./Player";
import Players from "./Players";
import Position from "./Position";

class GameModel {
  size: number = 8;
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
    this.board = new BoardModel(this.size);
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

  // 駒を置いて、相手の駒をひっくり返す
  putPiece(position: Position) {
    // 自分の駒を置く場所を取得
    const cell = this.board.getCell(position);
    // 駒を置く
    cell.piece = this.currentPlayer.piece;
    // ひっくり返せる駒の位置を取得
    const flippablePositions = cell.getFlippablePositions();
    // 駒をひっくり返す
    flippablePositions.map((position) => {
      this.board.getCell(position).piece = this.currentPlayer.piece;
    });
  }

  // 駒を置けるかどうかのフラグを立てる
  setCanPut() {
    this.setCanPutToCells();
    this.setCanPutToPlayer();
  }

  setCanPutToCells() {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        let position = new Position(x, y);
        this.setCanPutToCell(position);
      }
    }
  }

  setCanPutToCell(position: Position) {
    let cell = this.board.getCell(position);
    let allFlippablePositions: Position[] = [];

    DIRECTIONS.forEach((direction) => {
      let flippablePositions = this.getFlippablePositionsInDirection(
        position,
        direction
      );

      if (flippablePositions.length > 0) {
        allFlippablePositions.push(...flippablePositions);
      }
    });

    const canPut = allFlippablePositions.length > 0;
    cell.setCanPut(canPut);
    if (canPut) {
      cell.setFlippablePositions(allFlippablePositions);
    }
  }

  getFlippablePositionsInDirection = (
    position: Position,
    direction: Direction
  ): Position[] => {
    let cell = this.board.getCell(position);
    let flippablePositions: Position[] = [];
    if (cell.piece === PieceModel.None) {
      let foundOpponent = false;
      position = position.addDirection(direction);
      while (position.isVaild(this.size)) {
        // 盤面の範囲内でループを続ける
        // xとyは、現在調査中のセルの座標
        if (this.existsOtherPiece(position)) {
          // 現在のプレイヤーの対戦相手のコマが見つかった場合
          // 例: 現在のプレイヤーが黒の場合、白のコマを見つけた状況
          foundOpponent = true;
          flippablePositions.push(position);
        } else if (
          this.board.getCell(position).piece === this.currentPlayer.piece &&
          foundOpponent
        ) {
          // 現在のプレイヤーのコマが見つかり、かつ対戦相手のコマを既に見つけていた場合
          // これはコマを置くことができる状況を意味する
          return flippablePositions;
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

  existsOtherPiece(position: Position) {
    return (
      this.board.getCell(position).piece !== PieceModel.None &&
      this.board.getCell(position).piece !== this.currentPlayer.piece
    );
  }

  setCanPutToPlayer() {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        let position = new Position(x, y);
        let cell = this.board.getCell(position);
        if (cell.getCanPut()) {
          this.currentPlayer.canPut = true;
          return;
        }
      }
    }
    this.currentPlayer.canPut = false;
  }

  // 次のプレイヤーに交代
  toNextPlayer() {
    this.currentPlayer = this.players.getNextPlayer(this.currentPlayer);
  }

  // positionに駒を置けるかどうか
  getCanPut(position: Position): boolean {
    return this.board.getCell(position).getCanPut();
  }
}

export default GameModel;
