class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(position: Position): Position {
    return new Position(this.x + position.x, this.y + position.y);
  }

  equals(position: Position): boolean {
    return this.x === position.x && this.y === position.y;
  }

  isVaild(boardSize: number): boolean {
    return (
      this.x >= 0 && this.x < boardSize && this.y >= 0 && this.y < boardSize
    );
  }
}

export default Position;
