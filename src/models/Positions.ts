class Positions {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(positions: Positions): Positions {
    return new Positions(this.x + positions.x, this.y + positions.y);
  }

  equals(positions: Positions): boolean {
    return this.x === positions.x && this.y === positions.y;
  }

  isVaild(boardSize: number): boolean {
    return (
      this.x >= 0 && this.x < boardSize && this.y >= 0 && this.y < boardSize
    );
  }
}

export default Positions;
