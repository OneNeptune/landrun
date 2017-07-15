/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const BORDER = 10;
/* harmony export (immutable) */ __webpack_exports__["b"] = BORDER;

const BOARD_SIZE = 60;
/* harmony export (immutable) */ __webpack_exports__["a"] = BOARD_SIZE;

const SQUARE_SIZE = 20;
/* harmony export (immutable) */ __webpack_exports__["g"] = SQUARE_SIZE;

const SPEED = 5;
/* harmony export (immutable) */ __webpack_exports__["f"] = SPEED;

const FRAME = 24;
/* harmony export (immutable) */ __webpack_exports__["c"] = FRAME;

const SCORE_HEIGHT = 30;
/* harmony export (immutable) */ __webpack_exports__["d"] = SCORE_HEIGHT;

const SHADOW_SIZE = 3;
/* harmony export (immutable) */ __webpack_exports__["e"] = SHADOW_SIZE;

const MIN_SQ = 6;
/* unused harmony export MIN_SQ */

const MAX_SQ = 53;
/* unused harmony export MAX_SQ */

const WIN_PER = 1;
/* harmony export (immutable) */ __webpack_exports__["h"] = WIN_PER;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__(0);


const randomNum = (min, max) => {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil)) + minCeil;
};
/* harmony export (immutable) */ __webpack_exports__["randomNum"] = randomNum;


const squaresIntersect = (a, b) => {
  if (a < b) {
    return b < a + __WEBPACK_IMPORTED_MODULE_0__global__["g" /* SQUARE_SIZE */];
  } else {
    return a < b + __WEBPACK_IMPORTED_MODULE_0__global__["g" /* SQUARE_SIZE */];
  }
};
/* harmony export (immutable) */ __webpack_exports__["squaresIntersect"] = squaresIntersect;


const randomColor = () => {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 6; i ++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
};
/* harmony export (immutable) */ __webpack_exports__["randomColor"] = randomColor;


const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};
/* harmony export (immutable) */ __webpack_exports__["hexToRgb"] = hexToRgb;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(4);


document.addEventListener('DOMContentLoaded', () => {
  var config = {
    apiKey: "AIzaSyBBNqha-ZUhUFLraH1abUaWjVMCWV8elkM",
    authDomain: "landrun-66dd5.firebaseapp.com",
    databaseURL: "https://landrun-66dd5.firebaseio.com",
    projectId: "landrun-66dd5",
    storageBucket: "scores",
    messagingSenderId: "425401135146"
  };
  firebase.initializeApp(config);

  let game = null;
  let scores = firebase.database().ref("scores")

  const gameOver = (won, playerName, score, completionTime) => {
    const modal = won ? 'won' : 'loss';
    game = null;
    document.getElementById('nameDisplay').textContent = playerName;
    document.getElementById(modal).className = 'game-modal-open';
    if (won) {
      const submitBtn = document.getElementById('submitscore')
      const handleSubmit = () => {
        firebase.database()
          .ref("scores")
          .push()
          .set({
            username: playerName,
            score: (score * 10000)
          });
        submitBtn.removeEventListener('click', handleSubmit);
        submitBtn.textContent = 'Submitted!';
      };
      submitBtn.addEventListener('click', handleSubmit);
      document.getElementById('area').textContent = `${(score * 100).toFixed(2)}% `;
      document.getElementById('time').textContent = ` ${Math.floor(completionTime / 1000)} seconds`;
      scores = firebase.database().ref("scores");
    }
  };

  const allModals = Array.from(document.getElementsByTagName('div'));
  const btnListener = (e) => {
    allModals.forEach(modal => { modal.className = 'game-modal'; });
    document.getElementById(e.target.className).className = 'game-modal-open';
  };

  const allButtons = Array.from(document.getElementsByTagName('button'));
  allButtons.forEach(button => button.addEventListener('click', btnListener));

  const newGameBtns = Array.from(document.getElementsByClassName('start-game'));

  newGameBtns.forEach(btn => btn.addEventListener('click', () => {
    const playerName = document.getElementsByClassName('playerName')[0].value;
    allModals.forEach(modal => { modal.className = 'game-modal'; });
    game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](9, playerName, gameOver);
    })
  );

  scores.orderByChild("score").limitToLast(10).on('value', (snapshot, highscores) => {
    const scoresList = document.getElementById("scorelist");
    let currentScores = document.getElementsByClassName("scores-li")
    for (var i = currentScores.length - 1; i >= 0; i--) {
      currentScores.item(i).remove();
    }
    highscores = [];
      snapshot.forEach((childSnapshot) => {
          highscores.push((childSnapshot.val()));
      });
      highscores = highscores.reverse();
      for (var j = 0; j < highscores.length; j++) {
        let score = document.createElement("li");
        scoresList.appendChild(score);
        score.className = 'scores-li';
        let name = document.createElement('span');
        let scoreText = document.createElement('span');
        name.textContent = `${highscores[j].username}`;
        scoreText.textContent = `${Math.floor(highscores[j].score)}`;
        score.appendChild(name);
        score.appendChild(scoreText);
      }

  });

  addEventListener('keydown', (e) => {
    if (e.which === 13 && game === null) {
      const playerName = document.getElementsByClassName('playerName')[0].value;
      allModals.forEach(modal => { modal.className = 'game-modal'; });
      game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](9, playerName, gameOver);
    }
  })
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math_util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__audio_js__ = __webpack_require__(8);








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
      __WEBPACK_IMPORTED_MODULE_4__audio_js__["d" /* track */].play();
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
    this.gameHeight = this.canvasHeight - __WEBPACK_IMPORTED_MODULE_3__global__["d" /* SCORE_HEIGHT */];
  }

  initializeBoard() {
    const updateScore = (row, col, before, after) => {
      if (before) { this.playerPortion[before.num]--; }
      if (after) { this.playerPortion[after.num]++; }
    };

    this.grid = new __WEBPACK_IMPORTED_MODULE_1__board__["a" /* default */](__WEBPACK_IMPORTED_MODULE_3__global__["a" /* BOARD_SIZE */], updateScore);
  }

  initializePlayers(numPlayers) {
    const { randomNum } = __WEBPACK_IMPORTED_MODULE_2__math_util__;
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
    const { randomNum } = __WEBPACK_IMPORTED_MODULE_2__math_util__;

    let playerRow, playerCol, currentHeading;
    const cpuStart = randomNum(0,4);
    // 0 top, 1 right, 2 bottom, 3 left
    switch (cpuStart) {
      case 0: // top of board, row = 0, col random, drection 2
        playerCol = randomNum(1, __WEBPACK_IMPORTED_MODULE_3__global__["a" /* BOARD_SIZE */] -1);
        playerRow = -1;
        currentHeading = 2;
        break;
      case 1: // right of baord, col
        playerCol = __WEBPACK_IMPORTED_MODULE_3__global__["a" /* BOARD_SIZE */] + 1;
        playerRow = randomNum(1, __WEBPACK_IMPORTED_MODULE_3__global__["a" /* BOARD_SIZE */] -1);
        currentHeading = 3;
        break;
      case 2:
        playerCol = randomNum(1, __WEBPACK_IMPORTED_MODULE_3__global__["a" /* BOARD_SIZE */] -1);
        playerRow = __WEBPACK_IMPORTED_MODULE_3__global__["a" /* BOARD_SIZE */] + 1;
        currentHeading = 0;
        break;
      case 3:
        playerCol = -1;
        playerRow = randomNum(1, __WEBPACK_IMPORTED_MODULE_3__global__["a" /* BOARD_SIZE */] -1);
        currentHeading = 1;
        break;
    }

    const options = {
      posX: playerCol * __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */],
      posY: playerRow * __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */],
      currentHeading: currentHeading,
      num: idx
    };

    const newPlayer = new __WEBPACK_IMPORTED_MODULE_0__player_js__["a" /* default */](this.grid, options);
    this.playerPortion[idx] = 0;
    this.allPlayers[idx] = newPlayer;
    this.players[idx] = newPlayer;
  }

  makePlayer(isPlayer) {
    const idx = this.players.length;
    const { randomNum } = __WEBPACK_IMPORTED_MODULE_2__math_util__;

    const playerRow = randomNum(8, __WEBPACK_IMPORTED_MODULE_3__global__["a" /* BOARD_SIZE */] - 8);
    const playerCol = randomNum(8, __WEBPACK_IMPORTED_MODULE_3__global__["a" /* BOARD_SIZE */] - 8);
    const options = {
      posX: playerCol * __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */],
      posY: playerRow * __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */],
      currentHeading: randomNum(0, 4),
      num: idx
    };
    const newPlayer = new __WEBPACK_IMPORTED_MODULE_0__player_js__["a" /* default */](this.grid, options);
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
    const xOff = Math.floor(player.posX - (this.gameWidth - __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */]) / 2);
    const yOff = Math.floor(player.posY - (this.gameHeight - __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */]) / 2);
    pos[0] = Math.max(
      Math.min(
        xOff, this.grid.size * __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */] + __WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */] * 2 - this.gameWidth
      ), 0);
    pos[1] = Math.max(
      Math.min(
        yOff, this.grid.size * __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */] + __WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */] * 2 - this.gameHeight
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
        magnitude = Math.min(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* SPEED */], Math.abs(delta));
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
            if (val.col() > __WEBPACK_IMPORTED_MODULE_3__global__["a" /* BOARD_SIZE */]) {
              val.dead = true;
            }
            break;
          case 2:
            if (val.row() > __WEBPACK_IMPORTED_MODULE_3__global__["a" /* BOARD_SIZE */]) {
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
      if (newPlayerFrames[val.num] < __WEBPACK_IMPORTED_MODULE_3__global__["c" /* FRAME */]) {
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
            __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* collision */].play();
          }
          removing[j] = true;
        }
        if (!removing[i] && players[i].tail.tailCollision(players[j])) {
          if ((j === 0 || i === 0) && window.SOUND) {
            __WEBPACK_IMPORTED_MODULE_4__audio_js__["a" /* collision */].play();
          }
          removing[i] = true;
        }

        if (i !== j &&
            __WEBPACK_IMPORTED_MODULE_2__math_util__["squaresIntersect"](players[i].startX, players[j].startX) &&
          __WEBPACK_IMPORTED_MODULE_2__math_util__["squaresIntersect"](players[i].startY, players[j].startY)) {
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
      (__WEBPACK_IMPORTED_MODULE_3__global__["a" /* BOARD_SIZE */] * __WEBPACK_IMPORTED_MODULE_3__global__["a" /* BOARD_SIZE */]);
    }
    this.portionSpeed = Math.abs(userPortion - lagPortion) / __WEBPACK_IMPORTED_MODULE_3__global__["c" /* FRAME */];
    this.centerOnPlayer(this.user, animateTo);
  }

  area(player) {
    const xDest = player.col * __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */];
    const yDest = player.row * __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */];

    if (player.startX === xDest) {
      return Math.abs(player.startY - yDest);
    } else {
      return Math.abs(player.startX - xDest);
    }
  }

  drawGrid() {
    const { ctx, offset, gameHeight, gameWidth, grid } = this;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */] * __WEBPACK_IMPORTED_MODULE_3__global__["a" /* BOARD_SIZE */], __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */] * __WEBPACK_IMPORTED_MODULE_3__global__["a" /* BOARD_SIZE */]);

    this.drawGridBorder();

    const minRow = Math.max(Math.floor((offset[1] - __WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */]) / __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */]), 0);
    const minCol = Math.max(Math.floor((offset[0] - __WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */]) / __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */]), 0);
    const maxRow = Math.min(
      Math.ceil((offset[1] + gameHeight) / __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */]), grid.size);
    const maxCol = Math.min(
      Math.ceil((offset[0] + gameWidth) / __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */]), grid.size);

    for (let row = minRow; row < maxRow; row++) {
      for (let col = minCol; col < maxCol; col++) {
        const player = this.grid.get(row, col);
        const x = col * __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */];
        const y = row * __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */];
        let baseColor;
        let shadowColor;

        if (player) {
          baseColor = player.baseColor;
          shadowColor = player.shadowColor;
        } else {
          continue;
        }
        this.ctx.fillStyle = baseColor;
        this.ctx.fillRect(x, y, __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */], __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */]);
      }
    }
  }

  drawGridBorder() {
    const { ctx } = this;
    ctx.fillStyle = 'darkgrey';
    const gridWidth = __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */] * __WEBPACK_IMPORTED_MODULE_3__global__["a" /* BOARD_SIZE */];

    ctx.fillRect(-__WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */], 0, __WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */], gridWidth);
    ctx.fillRect(-__WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */], -__WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */], gridWidth + __WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */] * 2, __WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */]);
    ctx.fillRect(gridWidth, 0, __WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */], gridWidth);
    ctx.fillRect(-__WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */], gridWidth, gridWidth + __WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */] * 2, __WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */]);
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
    ctx.translate(-offset[0] + __WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */], -offset[1] + __WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */] + __WEBPACK_IMPORTED_MODULE_3__global__["d" /* SCORE_HEIGHT */]);
    ctx.rect(offset[0] - __WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */], offset[1] - __WEBPACK_IMPORTED_MODULE_3__global__["b" /* BORDER */], canvasWidth, canvasHeight);
    ctx.clip();
    this.drawGrid();
    players.forEach((player) => {
      const fr = this.newPlayerFrames[player.num] || 0;
      if (fr < __WEBPACK_IMPORTED_MODULE_3__global__["c" /* FRAME */]) {
        player.draw(ctx, fr / __WEBPACK_IMPORTED_MODULE_3__global__["c" /* FRAME */]);
      } else {
        player.draw(ctx);
      }
    });

    ctx.restore();

    ctx.fillStyle = "#727272";
    ctx.fillRect(0, 0, 684, __WEBPACK_IMPORTED_MODULE_3__global__["d" /* SCORE_HEIGHT */]);

    ctx.fillStyle = "rgba(180, 180, 180, .3)";
    ctx.fillRect(0, 0, 684, __WEBPACK_IMPORTED_MODULE_3__global__["d" /* SCORE_HEIGHT */]);

    const barSize = Math.ceil((684 * this.lagPortion));
    ctx.fillStyle = this.user.baseColor;
    ctx.fillRect(0, 0, barSize, __WEBPACK_IMPORTED_MODULE_3__global__["d" /* SCORE_HEIGHT */]);

    ctx.fillStyle = "#333";
    ctx.font = "14px 'Press Start 2P'";
    ctx.fillText((lagPortion * 100).toFixed(1) + "%", 5+2, __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */] + 4);

    ctx.fillStyle = "white";
    ctx.font = "14px 'Press Start 2P'";
    ctx.fillText((lagPortion * 100).toFixed(1) + "%", 5, __WEBPACK_IMPORTED_MODULE_3__global__["g" /* SQUARE_SIZE */] + 2);

    if (this.user.dead && !this.gameOver)
    {
      this.gameOver = true;
      __WEBPACK_IMPORTED_MODULE_4__audio_js__["d" /* track */].pause();
      // you dead
    }

    this.frameCount++;
    if (this.frameCount % 2 === 0) {
      this.update();
      if (this.userPortion > this.highscore) {
        this.highscore = this.userPortion;
      }
    }

    if (this.userPortion >= __WEBPACK_IMPORTED_MODULE_3__global__["h" /* WIN_PER */]) this.won = true;

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
          __WEBPACK_IMPORTED_MODULE_4__audio_js__["d" /* track */].play();
        } else {
          __WEBPACK_IMPORTED_MODULE_4__audio_js__["d" /* track */].pause();
        }
        return;
      case 32:
        this.paused = !this.paused;
        if (this.paused) {
          __WEBPACK_IMPORTED_MODULE_4__audio_js__["d" /* track */].pause();
        } else {
          if (window.SOUND) {
            __WEBPACK_IMPORTED_MODULE_4__audio_js__["d" /* track */].play();
          } else {
            __WEBPACK_IMPORTED_MODULE_4__audio_js__["d" /* track */].pause();
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
          __WEBPACK_IMPORTED_MODULE_4__audio_js__["e" /* turn */].play();
        }
      this.user.heading = newHeading;
    }
  }

  directionListeners() {
    const { user } = this;
    document.addEventListener('keydown', this.listener);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tail__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math_util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__audio_js__ = __webpack_require__(8);






class Player {
  constructor(grid, options) {
    this.setColors();
    this.move = this.move.bind(this);
    this.row = this.row.bind(this);
    this.col = this.col.bind(this);
    // this.cpuKeepAlive = this.cpuKeepAlive.bind(this);

    this.cpu = true;
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
    const hexColor = __WEBPACK_IMPORTED_MODULE_2__math_util__["randomColor"]();
    const rgbColor = __WEBPACK_IMPORTED_MODULE_2__math_util__["hexToRgb"](hexColor);
    this.baseColor = hexColor;
    this.shadowColor = `rgba(0, 0, 0, 0.4)`;
    this.tailColor = `rgba(${rgbColor.r},${rgbColor.g},${rgbColor.b},0.4)`;
  }

  initializeTail() {
    const tail = new __WEBPACK_IMPORTED_MODULE_0__tail__["a" /* default */](this);
    tail.adjust(this.row(), this.col());
    return tail;
  }

  nearestInteger(positive, value) {
    return positive ? Math.ceil(value) : Math.floor(value);
  }

  row() {
    const { currentHeading, posY } = this;
    return this.nearestInteger(currentHeading === 2, posY / __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */]);
  }

  col() {
    const { currentHeading, posX } = this;
    return this.nearestInteger(currentHeading === 1, posX / __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */]);
  }

  eliminate() {
    this.dead = true;
  }

  draw(ctx) {
    // if (this.cpu) this.cpuKeepAlive();
    if (this.cpu) {
      ctx.fillStyle = 'rgba(170, 44, 44, 0.1)';
      switch (this.heading) {
        case 0:
        ctx.fillRect(this.posX, 0, __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */], this.posY);
        break;
        case 1:
        ctx.fillRect(this.posX, this.posY, (__WEBPACK_IMPORTED_MODULE_1__global__["a" /* BOARD_SIZE */] * __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */]) - this.posX, __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */]);
        break;
        case 2:
        ctx.fillRect(this.posX, this.posY, __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */], (__WEBPACK_IMPORTED_MODULE_1__global__["a" /* BOARD_SIZE */] * __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */]) - this.posY);
        break;
        case 3:
        ctx.fillRect(0, this.posY, this.posX, __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */]);
        // this.posX -= SPEED;
        break;
      }
    }
    this.tail.drawTail(ctx);

    const offSetPosY = this.posY - __WEBPACK_IMPORTED_MODULE_1__global__["e" /* SHADOW_SIZE */];
    ctx.fillStyle = this.shadowColor;
    ctx.fillRect(this.posX, this.posY, __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */], __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */]);

    ctx.fillStyle = this.baseColor;
    ctx.fillRect(this.posX, offSetPosY, __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */], __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */]);
    ctx.strokeRect(this.posX, offSetPosY, __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */], __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */]);

    if (!this.cpu) {
      ctx.fillStyle = this.baseColor;
      ctx.textAlign = "center";
      ctx.fillText(this.name, (this.posX + __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */] / 2) + 2, this.posY - 10);
      ctx.fillStyle = this.baseColor;
      ctx.textAlign = "center";
      ctx.fillText(this.name, this.posX + __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */] / 2, this.posY - 8);
      ctx.fillStyle = '#666';
      ctx.textAlign = "center";
      ctx.fillText(this.name, (this.posX + __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */] / 2) + 1, this.posY - 9);
    }
  }

  // cpuKeepAlive() {
  //   // 0 is up, 1 is right, 2 is down, 3 is left
  //   const headings = [0, 1, 2, 3];
  //
  //   if (this.lastMoveTime === null ||
  //     (new Date() - this.lastMoveTime) > 1200 ) {
  //       const newHeadings = headings;
  //       newHeadings.splice(this.currentHeading, 1);
  //       this.heading = newHeadings[MathUtil.randomNum(0,3)];
  //       this.lastMoveTime = new Date();
  //   }
  //   const col = this.col();
  //   const row = this.row();
  //   if (col < MIN_SQ) {
  //     this.heading = 0;
  //     this.lastMoveTime = new Date();
  //   }
  //
  //   if (row < MIN_SQ) {
  //     this.heading = 1;
  //     this.lastMoveTime = new Date();
  //   }
  //
  //   if (col > MAX_SQ) {
  //     this.heading = 2;
  //     this.lastMoveTime = new Date();
  //   }
  //
  //   if (row > MAX_SQ) {
  //     this.heading = 3;
  //     this.lastMoveTime = new Date();
  //   }
  // }

  move() {
    let heading = this.heading;
    // if (this.cpu) this.cpuKeepAlive();

    if (this.posX % __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */] !== 0 || this.posY % __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */] !== 0) {
      heading = this.currentHeading;
    } else {
      this.currentHeading = heading;
    }

    switch (heading) {
      case 0:
        this.posY -= __WEBPACK_IMPORTED_MODULE_1__global__["f" /* SPEED */];
        break;
      case 1:
        this.posX += __WEBPACK_IMPORTED_MODULE_1__global__["f" /* SPEED */];
        break;
      case 2:
        this.posY += __WEBPACK_IMPORTED_MODULE_1__global__["f" /* SPEED */];
        break;
      case 3:
        this.posX -= __WEBPACK_IMPORTED_MODULE_1__global__["f" /* SPEED */];
        break;
    }
    const row = this.row();
    const col = this.col();

    if (this.grid.isOutOfBounds(row, col) && !this.cpu) {
      if (window.SOUND) __WEBPACK_IMPORTED_MODULE_3__audio_js__["b" /* explode */].play();
      this.dead = true;
    } else {
      if (this.grid.get(row, col) === this) { // SAFE!
        this.tail.fillTail(this.grid);
        this.tail.adjust(row, col);
        this.playerSafe = true;
      } else if (
        this.posX % __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */] === 0 &&
        this.posY % __WEBPACK_IMPORTED_MODULE_1__global__["g" /* SQUARE_SIZE */] === 0) {
        this.playerSafe = false;
        this.tail.addTail(heading);
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stack__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__audio_js__ = __webpack_require__(8);






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
    fold.moveTo(cornerStart[1] * __WEBPACK_IMPORTED_MODULE_2__global__["g" /* SQUARE_SIZE */], cornerStart[0] * __WEBPACK_IMPORTED_MODULE_2__global__["g" /* SQUARE_SIZE */]);
    fold.lineTo(a[1] * __WEBPACK_IMPORTED_MODULE_2__global__["g" /* SQUARE_SIZE */], a[0] * __WEBPACK_IMPORTED_MODULE_2__global__["g" /* SQUARE_SIZE */]);
    fold.lineTo(b[1] * __WEBPACK_IMPORTED_MODULE_2__global__["g" /* SQUARE_SIZE */], b[0] * __WEBPACK_IMPORTED_MODULE_2__global__["g" /* SQUARE_SIZE */]);
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
    let col = start[1] * __WEBPACK_IMPORTED_MODULE_2__global__["g" /* SQUARE_SIZE */];
    let row = start[0] * __WEBPACK_IMPORTED_MODULE_2__global__["g" /* SQUARE_SIZE */];
    let width = (end[1] - start[1]) * __WEBPACK_IMPORTED_MODULE_2__global__["g" /* SQUARE_SIZE */];
    let height = (end[0] - start[0]) * __WEBPACK_IMPORTED_MODULE_2__global__["g" /* SQUARE_SIZE */];

    if (width === 0) {
      width += __WEBPACK_IMPORTED_MODULE_2__global__["g" /* SQUARE_SIZE */];
    }
    if (height === 0) {
      height += __WEBPACK_IMPORTED_MODULE_2__global__["g" /* SQUARE_SIZE */];
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
    const visited = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](grid.size);
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
    if (window.SOUND) __WEBPACK_IMPORTED_MODULE_3__audio_js__["c" /* tailComplete */].play();
  }

  fillClaimed(grid, initRow, initCol, visited) {
    let points = [];
    let filled = new __WEBPACK_IMPORTED_MODULE_1__stack__["a" /* default */]();
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

/* harmony default export */ __webpack_exports__["a"] = (Tail);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Stack {
  constructor() {
    this.store = [];
  }

  push(object) {
    this.store.push(object);
  }

  pop() {
    return this.store.pop();
  }

  isEmpty() {
    return this.store.length === 0;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Stack);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const turn = new Audio('./assets/sounds/NFF-spit.wav');
/* harmony export (immutable) */ __webpack_exports__["e"] = turn;

const collision = new Audio('./assets/sounds/NFF-low-wave.wav');
/* harmony export (immutable) */ __webpack_exports__["a"] = collision;

const track = new Audio('./assets/sounds/Rhinoceros.mp3');
/* harmony export (immutable) */ __webpack_exports__["d"] = track;

const tailComplete = new Audio('./assets/sounds/NFF-money.wav');
/* harmony export (immutable) */ __webpack_exports__["c"] = tailComplete;

const explode = new Audio('./assets/sounds/NFF-magic-exploding.wav');
/* harmony export (immutable) */ __webpack_exports__["b"] = explode;



turn.volume = 0.15;
collision.volume = 0.50;
track.volume = 0.25;
tailComplete.volume = 0.15;
explode.volume = 0.25;

track.loop = true;


/***/ })
/******/ ]);
//# sourceMappingURL=landrun_bundle.js.map