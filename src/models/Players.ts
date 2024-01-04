import Player from "./Player";

class Players {
  players: Player[];
  constructor(players: Player[]) {
    this.players = players;
  }

  getStartPlayer(): Player {
    return this.players[0];
  }

  getNextPlayer(currentPlayer: Player): Player {
    const index = this.players.findIndex(
      (player) => player.name === currentPlayer.name
    );
    return this.players[(index + 1) % this.players.length];
  }
}

export default Players;
