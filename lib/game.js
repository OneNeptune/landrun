import Player from './player.js';
import Board from './board';
import * as MathUtil from './math_util';

import {
  BORDER,
  BOARD_SIZE,
  SQUARE_SIZE,
  SPEED,
  FRAME,
  SCORE_HEIGHT,
  WIN_PER
} from './global';

import * as SFX from './audio.js';

class Game {
  constructor(numPlayers = 10, playerName = 'Player 1', handleGameOver) {
    this.paused = false;
    this.numPlayers = numPlayers;
    this.won = false;
    this.handleGameOver = handleGameOver;
    this.drawLoop = this.drawLoop.bind(this);
    this.listener = this.listener.bind(this);
    this.directionListeners = this.directionListeners.bind(this);

    this.playerName = playerName;
    this.time = new Date();
    this.initializeCanvas();
    this.initializeBoard();
    this.initializePlayers(numPlayers);
    this.initializeStateVariables();
    this.centerOnPlayer(this.user, this.offset);
    if (window.SOUND === 'undefined') {
      window.SOUND = false;
    } else if (window.SOUND) {
      SFX.track.play();
    }
    this.directionListeners();
    this.drawLoop();
  }

  initializeCanvas() {
    this.canvas = document.getElementsByTagName("canvas")[0];
    this.ctx = this.canvas.getContext('2d');

    this.canvasWidth = this.canvas.width = 684;
    this.canvasHeight = this.canvas.height = 484;

    this.gameWidth = this.canvasWidth;
    this.gameHeight = this.canvasHeight - SCORE_HEIGHT;
  }

  initializeBoard() {
    const updateScore = (row, col, before, after) => {
      if (before) { this.playerPortion[before.num]--; }
      if (after) { this.playerPortion[after.num]++; }
    };

    this.grid = new Board(BOARD_SIZE, updateScore);
  }

  initializePlayers(numPlayers) {
    const { randomNum } = MathUtil;
    this.newPlayerFrames = [];
    this.playerPortion = [];
    this.allPlayers = [];
    this.players = [];

    for (let player = 0; player < numPlayers; player++) {
      if (player === 0) {
        this.makePlayer(true);
      } else {
        this.makeCPU();
      }
    }
  }

  makeCPU() {
    const idx = this.players.length;
    const { randomNum } = MathUtil;

    let playerRow, playerCol, currentHeading;
    const cpuStart = randomNum(0,4);
    // 0 top, 1 right, 2 bottom, 3 left
    switch (cpuStart) {
      case 0: // top of board, row = 0, col random, drection 2
        playerCol = randomNum(1, BOARD_SIZE -1);
        playerRow = -1;
        currentHeading = 2;
        break;
      case 1: // right of baord, col
        playerCol = BOARD_SIZE + 1;
        playerRow = randomNum(1, BOARD_SIZE -1);
        currentHeading = 3;
        break;
      case 2:
        playerCol = randomNum(1, BOARD_SIZE -1);
        playerRow = BOARD_SIZE + 1;
        currentHeading = 0;
        break;
      case 3:
        playerCol = -1;
        playerRow = randomNum(1, BOARD_SIZE -1);
        currentHeading = 1;
        break;
    }

    const options = {
      posX: playerCol * SQUARE_SIZE,
      posY: playerRow * SQUARE_SIZE,
      currentHeading: currentHeading,
      num: idx
    };

    const newPlayer = new Player(this.grid, options);
    this.playerPortion[idx] = 0;
    this.allPlayers[idx] = newPlayer;
    this.players[idx] = newPlayer;
  }

  makePlayer(isPlayer) {
    const idx = this.players.length;
    const { randomNum } = MathUtil;

    const playerRow = randomNum(8, BOARD_SIZE - 8);
    const playerCol = randomNum(8, BOARD_SIZE - 8);
    const options = {
      posX: playerCol * SQUARE_SIZE,
      posY: playerRow * SQUARE_SIZE,
      currentHeading: randomNum(0, 4),
      num: idx
    };
    const newPlayer = new Player(this.grid, options);
    this.playerPortion[idx] = 0;
    this.allPlayers[idx] = newPlayer;
    this.players[idx] = newPlayer;

    if (isPlayer) {
      this.user = this.players[0];
      // debugger;
      if (this.playerName) {
        this.user.name = this.playerName.slice(0,13);
      }
      this.user.cpu = false;

      for (let dRow = -1; dRow <= 1; dRow++) {
        for (let dCol = -1; dCol <= 1; dCol++) {
          if (!this.grid.isOutOfBounds(dRow + playerRow, dCol + playerCol)) {
            this.grid.set(
              dRow + playerRow, dCol + playerCol, this.players[idx]
            );
          }
        }
      }
    }
  }

  initializeStateVariables() {
    this.frameCount = 0;
    this.highscore = 0;
    this.animateTo = [0, 0];
    this.offset = [0, 0];
    this.userPortion = 0;
    this.lagPortion = 0;
    this.portionSpeed = 0;
    this.gameOver = false;

  }

  centerOnPlayer(player, pos) {
    const xOff = Math.floor(player.posX - (this.gameWidth - SQUARE_SIZE) / 2);
    const yOff = Math.floor(player.posY - (this.gameHeight - SQUARE_SIZE) / 2);
    pos[0] = Math.max(
      Math.min(
        xOff, this.grid.size * SQUARE_SIZE + BORDER * 2 - this.gameWidth
      ), 0);
    pos[1] = Math.max(
      Math.min(
        yOff, this.grid.size * SQUARE_SIZE + BORDER * 2 - this.gameHeight
      ), 0);
  }

  update() {
    const {
      animateTo,
      offset,
      lagPortion,
      userPortion,
      portionSpeed,
      players,
      newPlayerFrames,
      grid,
    } = this;

    let delta;
    let direction;
    let magnitude;

    for (let i = 0; i <= 1; i++) {
      if (animateTo[i] !== offset[i]) {
        delta = animateTo[i] - offset[i];
        direction = Math.sign(delta);
        magnitude = Math.min(SPEED, Math.abs(delta));
        offset[i] += direction * magnitude;
      }
    }

    if (lagPortion !== userPortion) {
      delta = userPortion - lagPortion;
      direction = Math.sign(delta);
      magnitude = Math.min(Math.abs(portionSpeed), Math.abs(delta));
      this.lagPortion += direction * magnitude;
    }

    const dead = [];
    this.players = this.players.filter((val, idx) => {
      if (!newPlayerFrames[val.num]) {
        newPlayerFrames[val.num] = 0;
      }
      if (val.cpu) {
        switch (val.heading) {
          case 0:
            if (val.row() < 0) {
              // debugger;
              val.dead = true;
            }
            break;
          case 1:
            if (val.col() > BOARD_SIZE) {
              val.dead = true;
            }
            break;
          case 2:
            if (val.row() > BOARD_SIZE) {
              val.dead = true;
            }
            break;
          case 3:
            if (val.col() < 0) {
              val.dead = true;
            }
            break;
        }
      }
      if (newPlayerFrames[val.num] < FRAME) {
        newPlayerFrames[val.num]++;
      } else {
        if (!(this.gameOver || this.won)) {
          val.move();
        }
      }
      if (val.dead) {
        dead.push(val);
      }
      return !val.dead;
    });

    if (this.players.length < this.numPlayers) {
      this.makeCPU();
    }

    const removing = [];
    for (let i = 0; i < players.length; i++) {
      for (let j = i; j < players.length; j++) {
        if (!removing[j] && players[j].tail.tailCollision(players[i])) {
          if ((j === 0 || i === 0) && window.SOUND) {
            SFX.collision.play();
          }
          removing[j] = true;
        }
        if (!removing[i] && players[i].tail.tailCollision(players[j])) {
          if ((j === 0 || i === 0) && window.SOUND) {
            SFX.collision.play();
          }
          removing[i] = true;
        }

        if (i !== j &&
            MathUtil.squaresIntersect(players[i].startX, players[j].startX) &&
          MathUtil.squaresIntersect(players[i].startY, players[j].startY)) {
          if (grid.get(players[i].row, players[i].col) === players[i]) {
            removing[j] = true;
          } else if (grid.get(players[j].row, players[j].col) === players[j]) {
            removing[i] = true;
          } else {
            const areaI = this.area(players[i]);
            const areaJ = this.area(players[j]);

            if (areaI === areaJ) {
              removing[i] = removing[j] = true;
            } else if (areaI > areaJ) {
              removing[i] = true;
            } else {
              removing[j] = true;
            }
          }
        }
      }
    }

    this.players = this.players.filter((val, idx) => {
      if (removing[idx])
      {
        dead.push(val);
        val.eliminate();
      }
      return !removing[idx];
    });

    dead.forEach((val) => {
      this.allPlayers[val.num] = undefined;
    });
    for (let row = 0; row < grid.size; row++) {
      for (let col = 0; col < grid.size; col++) {
        if (dead.indexOf(grid.get(row, col)) !== -1) {
          grid.set(row, col, null);
        }
      }
    }

    if (!(this.gameOver || this.won)) {
      this.userPortion = this.playerPortion[this.user.num] /
      (BOARD_SIZE * BOARD_SIZE);
    }
    this.portionSpeed = Math.abs(userPortion - lagPortion) / FRAME;
    this.centerOnPlayer(this.user, animateTo);
  }

  area(player) {
    const xDest = player.col * SQUARE_SIZE;
    const yDest = player.row * SQUARE_SIZE;

    if (player.startX === xDest) {
      return Math.abs(player.startY - yDest);
    } else {
      return Math.abs(player.startX - xDest);
    }
  }

  drawGrid() {
    const { ctx, offset, gameHeight, gameWidth, grid } = this;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, SQUARE_SIZE * BOARD_SIZE, SQUARE_SIZE * BOARD_SIZE);

    this.drawGridBorder();

    const minRow = Math.max(Math.floor((offset[1] - BORDER) / SQUARE_SIZE), 0);
    const minCol = Math.max(Math.floor((offset[0] - BORDER) / SQUARE_SIZE), 0);
    const maxRow = Math.min(
      Math.ceil((offset[1] + gameHeight) / SQUARE_SIZE), grid.size);
    const maxCol = Math.min(
      Math.ceil((offset[0] + gameWidth) / SQUARE_SIZE), grid.size);

    for (let row = minRow; row < maxRow; row++) {
      for (let col = minCol; col < maxCol; col++) {
        const player = this.grid.get(row, col);
        const x = col * SQUARE_SIZE;
        const y = row * SQUARE_SIZE;
        let baseColor;
        let shadowColor;

        if (player) {
          baseColor = player.baseColor;
          shadowColor = player.shadowColor;
        } else {
          continue;
        }
        this.ctx.fillStyle = baseColor;
        this.ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
      }
    }
  }

  drawGridBorder() {
    const { ctx } = this;
    ctx.fillStyle = 'darkgrey';
    const gridWidth = SQUARE_SIZE * BOARD_SIZE;

    ctx.fillRect(-BORDER, 0, BORDER, gridWidth);
    ctx.fillRect(-BORDER, -BORDER, gridWidth + BORDER * 2, BORDER);
    ctx.fillRect(gridWidth, 0, BORDER, gridWidth);
    ctx.fillRect(-BORDER, gridWidth, gridWidth + BORDER * 2, BORDER);
  }

  drawLoop() {
    // debugger;
    const {
      ctx,
      canvasWidth,
      canvasHeight,
      offset,
      players,
      lagPortion
    } = this;

    ctx.save();
    ctx.beginPath();
    ctx.translate(-offset[0] + BORDER, -offset[1] + BORDER + SCORE_HEIGHT);
    ctx.rect(offset[0] - BORDER, offset[1] - BORDER, canvasWidth, canvasHeight);
    ctx.clip();
    this.drawGrid();
    players.forEach((player) => {
      const fr = this.newPlayerFrames[player.num] || 0;
      if (fr < FRAME) {
        player.draw(ctx, fr / FRAME);
      } else {
        player.draw(ctx);
      }
    });

    ctx.restore();

    ctx.fillStyle = "#727272";
    ctx.fillRect(0, 0, 684, SCORE_HEIGHT);

    ctx.fillStyle = "rgba(180, 180, 180, .3)";
    ctx.fillRect(0, 0, 684, SCORE_HEIGHT);

    const barSize = Math.ceil((684 * this.lagPortion));
    ctx.fillStyle = this.user.baseColor;
    ctx.fillRect(0, 0, barSize, SCORE_HEIGHT);

    ctx.fillStyle = "#333";
    ctx.font = "14px 'Press Start 2P'";
    ctx.fillText((lagPortion * 100).toFixed(1) + "%", 5+2, SQUARE_SIZE + 4);

    ctx.fillStyle = "white";
    ctx.font = "14px 'Press Start 2P'";
    ctx.fillText((lagPortion * 100).toFixed(1) + "%", 5, SQUARE_SIZE + 2);

    if (this.user.dead && !this.gameOver)
    {
      this.gameOver = true;
      SFX.track.pause();
      // you dead
    }

    this.frameCount++;
    if (this.frameCount % 2 === 0) {
      this.update();
      if (this.userPortion > this.highscore) {
        this.highscore = this.userPortion;
      }
    }

    if (this.userPortion >= WIN_PER) this.won = true;

    if (this.gameOver || this.won) {
      document.removeEventListener('keydown', this.listener);
      if (this.highscore > 0.249999) {
        return this.handleGameOver(true, this.user.name, this.highscore, (new Date() - this.time));
      } else {
        return this.handleGameOver(false, this.user.name);
      }
    } else if (this.paused) {
      ctx.fillStyle = "rgba(0, 0, 0, .8)";
      ctx.fillRect(0, 0, 684, 484);

      ctx.fillStyle = "whitesmoke";
      ctx.font = "24px 'Press Start 2P'";
      ctx.fillText('paused', 270, 240);

      window.cancelAnimationFrame(this.frame);
    } else {
      this.frame = window.requestAnimationFrame(this.drawLoop);
    }
  }

  listener(e) {
    if (this.user.dead) { return; }
    let newHeading = -1;

    switch (e.which) {
      case 38:
        newHeading = 0;
        break;
      case 39:
        newHeading = 1;
        break;
      case 40:
        newHeading = 2;
        break;
      case 37:
        newHeading = 3;
        break;
      case 84:
        window.SOUND = !window.SOUND;
        if (window.SOUND) {
          SFX.track.play();
        } else {
          SFX.track.pause();
        }
        return;
      case 32:
        this.paused = !this.paused;
        if (this.paused) {
          SFX.track.pause();
        } else {
          if (window.SOUND) {
            SFX.track.play();
          } else {
            SFX.track.pause();
          }
        }
        this.drawLoop();
        e.preventDefault();
        return;
      default:
        return;
    }
    e.preventDefault();
    if (this.paused) return;
    if (newHeading === this.user.currentHeading ||
      ((newHeading % 2 === 0) ^ (this.user.currentHeading % 2 === 0))) {
        if((this.user.currentHeading !== newHeading) && window.SOUND) {
          SFX.turn.play();
        }
      this.user.heading = newHeading;
    }
  }

  directionListeners() {
    const { user } = this;
    document.addEventListener('keydown', this.listener);
  }
}

export default Game;
