class Board {
  constructor(size, update) {
    this.grid = new Array(size);
    this.size = size;
    this.update = update;
  }

  get(row, col) {
    return this.grid[row] && this.grid[row][col];
  }

  set(row, col, value) {
    if (!this.grid[row]) {
      this.grid[row] = new Array(this.size);
    }

    const before = this.grid[row][col];
    this.grid[row][col] = value;

    if (typeof this.update === "function") {
      this.update(row, col, before, value);
    }

    return before;
  }

  isOutOfBounds(row, col) {
    return row < 0 || row >= this.size || col < 0 || col >= this.size;
  }
}

export default Board;
