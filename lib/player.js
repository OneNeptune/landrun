import Tail from './tail';
import { SQUARE_SIZE, SPEED, SHADOW_SIZE, MIN_SQ, MAX_SQ } from './global';
import * as MathUtil from './math_util';

class Player {
  constructor(grid, options) {
    this.setColors();
    this.move = this.move.bind(this);
    this.row = this.row.bind(this);
    this.col = this.col.bind(this);
    this.cpuKeepAlive = this.cpuKeepAlive.bind(this);

    this.cpu = true;
    this.lastMoveTime = null;
    this.grid = grid;
    this.currentHeading = options.currentHeading;
    this.heading = this.currentHeading;
    this.dead = false;
    this.num = options.num;
    this.name = options.name || "Player " + (this.num + 1);
    this.posX = options.posX;
    this.posY = options.posY;
    this.tail = this.initializeTail();
  }

  setColors() {
    const hexColor = MathUtil.randomColor();
    const rgbColor = MathUtil.hexToRgb(hexColor);
    this.baseColor = hexColor;
    this.shadowColor = `rgba(0, 0, 0, 0.4)`;
    this.tailColor = `rgba(${rgbColor.r},${rgbColor.g},${rgbColor.b},0.4)`;
  }

  initializeTail() {
    const tail = new Tail(this);
    tail.adjust(this.row(), this.col());
    return tail;
  }

  nearestInteger(positive, value) {
    return positive ? Math.ceil(value) : Math.floor(value);
  }

  row() {
    const { currentHeading, posY } = this;
    return this.nearestInteger(currentHeading === 2, posY / SQUARE_SIZE);
  }

  col() {
    const { currentHeading, posX } = this;
    return this.nearestInteger(currentHeading === 1, posX / SQUARE_SIZE);
  }

  eliminate() {
    this.dead = true;
  }

  draw(ctx) {
    if (this.cpu) this.cpuKeepAlive();

    this.tail.drawTail(ctx);

    const offSetPosY = this.posY - SHADOW_SIZE;
    ctx.fillStyle = this.shadowColor;
    ctx.fillRect(this.posX, this.posY, SQUARE_SIZE, SQUARE_SIZE);

    ctx.fillStyle = this.baseColor;
    ctx.fillRect(this.posX, offSetPosY, SQUARE_SIZE, SQUARE_SIZE);
    ctx.strokeRect(this.posX, offSetPosY, SQUARE_SIZE, SQUARE_SIZE);

    ctx.fillStyle = this.baseColor;
    ctx.textAlign = "center";
    ctx.fillText(this.name, (this.posX + SQUARE_SIZE / 2) + 1, this.posY - 9);
    ctx.fillStyle = '#333';
    ctx.textAlign = "center";
    ctx.fillText(this.name, this.posX + SQUARE_SIZE / 2, this.posY - 10);
  }

  cpuKeepAlive() {
    // 0 is up, 1 is right, 2 is down, 3 is left
    const headings = [0, 1, 2, 3];

    if (this.lastMoveTime === null ||
      (new Date() - this.lastMoveTime) > 500 ) {
        const newHeadings = headings;
        newHeadings.splice(this.currentHeading, 1);
        this.heading = newHeadings[MathUtil.randomNum(0,3)];
        this.lastMoveTime = new Date();
    }
    const col = this.col();
    const row = this.row();
    if (col < MIN_SQ) {
      this.heading = 0;
      this.lastMoveTime = new Date();
    }

    if (row < MIN_SQ) {
      this.heading = 1;
      this.lastMoveTime = new Date();
    }

    if (col > MAX_SQ) {
      this.heading = 2;
      this.lastMoveTime = new Date();
    }

    if (row > MAX_SQ) {
      this.heading = 3;
      this.lastMoveTime = new Date();
    }
  }

  move() {
    let heading = this.heading;
    if (this.cpu) this.cpuKeepAlive();

    if (this.posX % SQUARE_SIZE !== 0 || this.posY % SQUARE_SIZE !== 0) {
      heading = this.currentHeading;
    } else {
      this.currentHeading = heading;
    }

    switch (heading) {
      case 0:
        this.posY -= SPEED;
        break;
      case 1:
        this.posX += SPEED;
        break;
      case 2:
        this.posY += SPEED;
        break;
      case 3:
        this.posX -= SPEED;
        break;
    }

    const row = this.row();
    const col = this.col();
    if (this.grid.isOutOfBounds(row, col)) {
      this.dead = true;
    } else {
      if (this.grid.get(row, col) === this) { // SAFE!
        this.tail.fillTail(this.grid);
        this.tail.adjust(row, col);
      } else if (
        this.posX % SQUARE_SIZE === 0 &&
        this.posY % SQUARE_SIZE === 0) {
        this.tail.addTail(heading);
      }
    }
  }
}

export default Player;
