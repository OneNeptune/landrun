import Board from './board';
import Stack from './stack';
import { BOARD_SIZE, SQUARE_SIZE } from './global';

import * as SFX from './audio.js';

class Tail {
  constructor(player) {
    this.player = player;
    this.grid = player.grid;
    this.tail = [];
    this.tailMatrix = [];
    this.prev = null;
    this.startRow = 0;
    this.startCol = 0;
    this.lastRow = 0;
    this.lastCol = 0;
  }

  visitTailMatrix(tailMatrix, row, col) {
    if (!tailMatrix[row]) {
      tailMatrix[row] = [];
    }
    tailMatrix[row][col] = true;
  }

  oldMove(direction) {
    return ({
      move: 1,
      direction: direction
    });
  }

  addTail(direction, count) {
    if (count === undefined) { count = 1; }
    if (!count || count < 0) { return; }

    let prev = this.prev;
    const row = this.lastRow;
    const col = this.lastCol;

    if (this.tail.length === 0) {
      this.visitTailMatrix(this.tailMatrix, row, col);
    }

    if (!prev || prev.direction !== direction) {
      prev = this.prev = this.oldMove(direction);
      this.tail.push(prev);
    } else {
      prev.move += count;
    }

    for (let i = 0; i < count; i++) {
      const pos = this.walk([this.lastRow, this.lastCol], null, direction, 1);
      this.lastRow = pos[0];
      this.lastCol = pos[1];
      this.visitTailMatrix(this.tailMatrix, pos[0], pos[1]);
    }
  }

  adjust(row, col) {
    this.lastRow = this.startRow = row;
    this.lastCol = this.startCol = col;
    this.prev = null;
    if (this.tail.length === 0) {
      return;
    } else {
      const ret = this.tail;
      this.tail = [];
      this.tailMatrix = [];
      return ret;
    }
  }

  drawTail(ctx) {
    if (!this.tail.length) { return; }

    ctx.fillStyle = this.player.tailColor;

    let lastDirection = -1;
    let start = [this.startRow, this.startCol];

    this.tail.forEach((tail) => {
      const oppositeDirection = tail.direction === 0 || tail.direction === 3;
      const back = start;

      if (!oppositeDirection) {
        start = this.walk(start, null, tail.direction, 1);
      }

      const finish = this.walk(start, null, tail.direction, tail.move - 1);


      if (tail.move > 1) {
        this.fillTailRect(ctx, start, finish);
      }

      if (lastDirection !== -1) {
        this.drawCorner(ctx, back, lastDirection, tail.direction);
      }

      start = finish;

      if (oppositeDirection) {
        this.walk(start, start, tail.direction, 1);
      }
      lastDirection = tail.direction;
    });

    const currentDirection = this.player.currentHeading;
    if (lastDirection === currentDirection) {
      this.fillTailRect(ctx, start, start);
    } else {
      this.drawCorner(ctx, start, lastDirection, currentDirection);
    }
  }

  drawCorner(ctx, cornerStart, last, current) {
    if (last === 0 || current === 0) {
      this.walk(cornerStart, cornerStart, 2, 1);
    }

    if (last === 3 || current === 3) {
      this.walk(cornerStart, cornerStart, 1, 1);
    }

    const a = this.walk(cornerStart, null, current, 1);
    const b = this.walk(a, null, last, 1);

    const fold = new Path2D();
    fold.moveTo(cornerStart[1] * SQUARE_SIZE, cornerStart[0] * SQUARE_SIZE);
    fold.lineTo(a[1] * SQUARE_SIZE, a[0] * SQUARE_SIZE);
    fold.lineTo(b[1] * SQUARE_SIZE, b[0] * SQUARE_SIZE);
    fold.closePath();
    for (let i = 0; i < 2; i++) {
      ctx.fill(fold);
    }
  }

  walk(from, to, direction, distance) {
    to = to || [];
    to[0] = from[0];
    to[1] = from[1];

    switch (direction) {
      case 0:
        to[0] -= distance;
        break;
      case 1:
        to[1] += distance;
        break;
      case 2:
        to[0] += distance;
        break;
      case 3:
        to[1] -= distance;
        break;
    }

    return to;
  }

  fillTailRect(ctx, start, end) {
    let col = start[1] * SQUARE_SIZE;
    let row = start[0] * SQUARE_SIZE;
    let width = (end[1] - start[1]) * SQUARE_SIZE;
    let height = (end[0] - start[0]) * SQUARE_SIZE;

    if (width === 0) {
      width += SQUARE_SIZE;
    }
    if (height === 0) {
      height += SQUARE_SIZE;
    }

    if (width < 0) {
      col += width;
      width = -width;
    }
    if (height < 0) {
      row += height;
      height = -height;
    }

    ctx.fillRect(col, row, width, height);
  }

  onTail(coord) {
    return this.tailMatrix[coord[0]] && this.tailMatrix[coord[0]][coord[1]];
  }

  fillTail(grid) { //BFS THAT TAILLLLLL
    if (this.tail.length === 0) { return; }

    const start = [this.startRow, this.startCol];
    const visited = new Board(grid.size);
    const points = [];

    points.push(start);
    while (points.length > 0) {
      const coord = points.shift();
      const row = coord[0];
      const col = coord[1];

      if (grid.isOutOfBounds(row, col) || visited.get(row, col)) { continue; }

      if (this.onTail(coord)) {
        visited.set(row, col, true);
        grid.set(row, col, this.player);

        this.fillClaimed(grid, row + 1, col, visited);
        this.fillClaimed(grid, row - 1, col, visited);
        this.fillClaimed(grid, row, col + 1, visited);
        this.fillClaimed(grid, row, col - 1, visited);

        points.push([row + 1, col]);
        points.push([row - 1, col]);
        points.push([row, col + 1]);
        points.push([row, col - 1]);
      }
    }
    if (window.SOUND) SFX.tailComplete.play();
  }

  fillClaimed(grid, initRow, initCol, visited) {
    let points = [];
    let filled = new Stack();
    let surrounded = true;

    points.push([initRow, initCol]);
    while (points.length > 0) {
      let coord = points.shift();
      const row = coord[0];
      const col = coord[1];

      if (grid.isOutOfBounds(row, col)) {
        surrounded = false;
        continue;
      }

      if (visited.get(row, col) ||
        this.onTail(coord) ||
        grid.get(row, col) === this.player) {
          continue;
        }

      visited.set(row, col, true);

      if (surrounded) {
        filled.push(coord);
      }

      points.push([row + 1, col]);
      points.push([row - 1, col]);
      points.push([row, col + 1]);
      points.push([row, col - 1]);
    }
    if (surrounded) {
      while (!filled.isEmpty()) {
        let coord = filled.pop();
        grid.set(coord[0], coord[1], this.player);
      }
    }

    return surrounded;
  }

  tailCollision(otherTail) {
    const { startRow, startCol, lastRow, lastCol, tailMatrix} = this;
    const otherRow = otherTail.row();
    const otherCol = otherTail.col();
    return (
      lastRow !== otherRow || lastCol !== otherCol) &&
      (startRow !== otherRow || startCol !== otherCol) &&
        Boolean(tailMatrix[otherRow] && tailMatrix[otherRow][otherCol]);
  }
}

export default Tail;
