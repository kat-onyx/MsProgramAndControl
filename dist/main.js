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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/gameView.js":
/*!*************************!*\
  !*** ./src/gameView.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MsPac = __webpack_require__(/*! ./msPac */ "./src/msPac.js");
const Inky = __webpack_require__(/*! ./ghost */ "./src/ghost.js").inky;
const Pinky = __webpack_require__(/*! ./ghost */ "./src/ghost.js").pinky;
const Clyde = __webpack_require__(/*! ./ghost */ "./src/ghost.js").clyde;
const Blinky = __webpack_require__(/*! ./ghost */ "./src/ghost.js").blinky;
const Maze = __webpack_require__(/*! ./maze */ "./src/maze.js");

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.keyPressed = [];
    this.startTime = Math.floor(Date.now() / 1000);
    this.maze = new Maze(this.ctx);
    this.msPac = new MsPac(this.ctx, this.maze);
    this.inky = new Inky(this.ctx, this.maze);
    this.pinky = new Pinky(this.ctx, this.maze, this.frameCount);
    this.blinky = new Blinky(this.ctx, this.maze, this.frameCount);
    this.clyde = new Clyde(this.ctx, this.maze, this.frameCount);
    this.ghostHouse = [this.inky, this.blinky, this.pinky, this.clyde];

    this.keyBinds = this.keyBinds.bind(this);
  }

  keyBinds() {
    //keyCodes obtained here: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode#Value_of_keyCode
    document.addEventListener("keydown", e => {
      if (e.code === "KeyD") {
        this.keyPressed.push(e.code);
        this.msPac.moveRight();
      }
      if (e.code === "KeyA") {
        this.keyPressed.push(e.code);
        this.msPac.moveLeft();
      }
      if (e.code === "KeyW") {
        this.keyPressed.push(e.code);
        this.msPac.moveUp();
      }
      if (e.code === "KeyS") {
        this.keyPressed.push(e.code);
        this.msPac.moveDown();
      }
    });

    document.addEventListener("keyup", e => {
      this.keyPressed.pop();
    });
  }

  play() {
    // this.keyBinds();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.ctx.clearRect(0, 0, 870, 750);
    this.step();
    this.detectPelletConsumtption();
    this.detectCritterCollision();
    this.updatePos();
    this.drawUnits();

    this.updateGhostBehavior();
    this.updateFrameCount();
    this.drawText();

    if (this.msPac.lives === 0 || this.maze.pellets.length === 0) {
      this.gameOver();
      return;
    }
    requestAnimationFrame(this.animate.bind(this));
  }

  updatePos() {
    this.detectTunnelTravel();
    // this.msPac.newPos(this.maze);
  }

  updateFrameCount() {
    this.frameCount += 1;
  }

  step() {
    this.msPac.checkDir();
    if (this.msPac.moveInput.length > 0) {
      this.checkMove(this.msPac.position);
    }

    this.ghostHouse.forEach(ghost => {
      ghost.checkDir();
    });
  }

  drawUnits() {
    this.maze.draw(this.ctx);
    this.msPac.draw(this.ctx);
    this.inky.draw(this.ctx);
    this.pinky.draw(this.ctx);
    this.blinky.draw(this.ctx);
    this.clyde.draw(this.ctx);
  }

  drawText() {
    this.showLives();
    this.showScore();
  }

  detectPelletConsumtption() {
    this.maze.pellets.forEach((pellet, i) => {
      if (this.isPointInTile(this.msPac, pellet)) {
        this.msPac.score += pellet.point;
        this.maze.pellets.splice(i, 1);
        return;
      }
    });
  }

  detectCritterCollision() {
    this.ghostHouse.forEach(ghost => {
      if (this.isPointInTile(this.msPac, ghost)) {
        console.log("collision");
        this.msPac.lives -= 1;
        this.restart();
      }
    });
  }

  updateGhostBehavior() {
    let currentTime = Math.floor(Date.now() / 1000);
    this.ghostHouse.forEach(ghost => {
      if (currentTime - this.startTime >= 30) {
        ghost.chaseMsPac(this.msPac);
      } else if (currentTime - this.startTime >= 20) {
        ghost.randomMovePath();
      }
    });
  }

  restart() {
    this.msPac.posX = 308;
    this.msPac.posY = 572;
    this.msPac.destinationPosX = 308,
    this.msPac.destinationPosY = 572;
    this.msPac.position = [7, 13];
  }

  isPointInTile(critter, pellet) {
    // debugger
    let pelletXMin = pellet.posX;
    let pelletXMax = pellet.posX + pellet.width;
    let pelletYMin = pellet.posY;
    let pelletYMax = pellet.posY + pellet.height;

    let critterXMin = critter.posX;
    let critterXMax = critter.posX + critter.width;
    let critterYMin = critter.posY;
    let critterYMax = critter.posY + critter.width;
    return (
      ((critterXMin >= pelletXMin && critterXMin < pelletXMax) ||
        (critterXMax > pelletXMin && critterXMax <= pelletXMax)) &&
      ((critterYMin >= pelletYMin && critterYMin < pelletYMax) ||
        (critterYMax > pelletYMin && critterYMax <= pelletYMax))
    );
  }

  detectTunnelTravel() {
    if (this.msPac.posX < 0) {
      this.msPac.posX = 700;
    } else if (this.msPac.posX > 700) {
      this.msPac.posX = 0;
    }
  }

  checkMove(critterPosition) {
    let currentXPos = this.msPac.position[0];
    let currentYPos = this.msPac.position[1];

    let nextXPos =
      critterPosition[0] + this.msPac.directions[this.msPac.moveInput[0]][0];
    let nextYPos =
      critterPosition[1] + this.msPac.directions[this.msPac.moveInput[0]][1];

    this.maze.tunnelPieces.forEach(tunnelPiece => {
      if (
        nextXPos === tunnelPiece.position[0] &&
        nextYPos === tunnelPiece.position[1]
      ) {
        this.msPac.position = [nextXPos, nextYPos];
        this.msPac.newDestination(currentXPos, currentYPos);
      }
    });
    this.msPac.moveInput.shift();
  }

  showScore() {
    this.ctx.fillStyle = "black";
    // this.ctx.fillRect(660, 365, 200, 25);
    this.ctx.fillStyle = "red";
    this.ctx.font = "30px Righteous";
    this.ctx.fillText(`Score: `, 730, 415);
    this.ctx.fillText(parseInt(this.msPac.score), 730, 450);
  }

  showLives() {
    this.ctx.fillStyle = "black";
    // this.ctx.fillRect(660, 365, 200, 25);
    this.ctx.fillStyle = "red";
    this.ctx.font = "30px Righteous";
    this.ctx.fillText("Lives: ", 730, 300);
    for (let i = 0; i < this.msPac.lives; i++) {
      this.ctx.drawImage(
        this.msPac.msPacImg,
        0,
        0,
        160,
        160,
        710 + i * 40,
        300,
        this.msPac.width * 2,
        this.msPac.width * 2
      );
    }
  }

  gameOver() {
    if (this.msPac.lives === 0) {
      this.ctx.font = "30px 'Righteous', cursive";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("GAME OVER", 265, 465);
      this.ctx.fillStyle = "black";
    } else {
      this.ctx.font = "30px 'Righteous', cursive";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("YOU WIN! :)", 265, 465);
      this.ctx.fillStyle = "black";
    }
  }
}

module.exports = GameView;


/***/ }),

/***/ "./src/ghost.js":
/*!**********************!*\
  !*** ./src/ghost.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingCritter = __webpack_require__(/*! ./movingCritter */ "./src/movingCritter.js");

const ghostsImg = new Image();
ghostsImg.loaded = false;
ghostsImg.onload = function() {
    this.loaded = true;
    console.log(this.loaded)
}
ghostsImg.src = './ghost.png';

class Ghost extends MovingCritter {
    constructor(ctx, velX, velY, frameCount) {
    super(ctx, velX, velY, frameCount);
    this.ctx = ctx;
    this.ghostsImg = ghostsImg;
    this.width = 43;
    this.height = 43;
    this.scared = false;
    this.destination = null;
    this.possiblePaths = [];
    this.ghostDirs = {
        "up": [0, -1],
        "down": [0, 1],
        "left": [-1, 0],
        "right": [1, 0]
    }

    this.newPos = function () {
        this.posX += this.velX;
        this.posY += this.velY;
        }
    }


    draw(ctx) {
       this.updateFrameCount()
       this.routeToDestination(this.destination);
       this.newPos();
       this.drawGhost(ctx);
    }

    chaseMsPac(msPacPos) {
       this.destination = [msPacPos.posX, msPacPos.posY]
    }

    drawGhost(ctx) {
        return ctx.drawImage(this.ghostsImg, this.imgOffsetX, 0, 160, 160, this.posX - 5, this.posY - 10, this.width * 1.5, this.width * 1.5)
    }

    calculateDestPath(currentPath) {

        let destination = currentPath;
        // debugger

        for (let k in this.ghostDirs) {
            let possibleDest = [
                this.posX + this.ghostDirs[k][0],
                this.posY + this.ghostDirs[k][1]
            ]
            if (possibleDest[0] < this.posX && destination[0] < this.posX) {
                if (this.possiblePaths.indexOf(this.ghostDirs["left"]) === -1) {
                    this.possiblePaths.push(this.ghostDirs["left"])
                } 
            } else if (possibleDest[0] > this.posX && destination[0] > this.posX) {
                if (this.possiblePaths.indexOf(this.ghostDirs["right"]) === -1) {
                    this.possiblePaths.push(this.ghostDirs["right"])
                }
            } else if (possibleDest[1] > this.posY && destination[1] > this.posY) {
                // console.log(possibleDest[1], this.destination[1])
                if (this.possiblePaths.indexOf(this.ghostDirs["down"]) === -1) {
                    this.possiblePaths.push(this.ghostDirs["down"])
                }
            } else if (possibleDest[1] < this.posY && destination[1] < this.posY) {
                if (this.possiblePaths.indexOf(this.ghostDirs["up"]) === -1) {
                this.possiblePaths.push(this.ghostDirs["up"])
                }
            }
        }
    }

    routeToDestination(currentDestination) {
        this.calculateDestPath(currentDestination);

        if (this.collisionDetectedGhost === false) {
            this.posX += this.possiblePaths[0][0];
            this.posY += this.possiblePaths[0][1];
        } else {
            this.posX -= this.possiblePaths[0][0];
            this.posY -= this.possiblePaths[0][1];
            this.collisionDetectedGhost = false;
            this.possiblePaths.splice(0, 1);
        }
    }

    randomMovePath() {
        let posX = Math.floor(Math.random() * 700);
        let posY = Math.floor(Math.random() * 770);
        this.destination = [posX, posY];
    }

    randomRoute() {

        if (this.collisionDetectedGhost === false) {
            this.posX += this.ghostDirs[this.randomPath][0];
            this.posY += this.ghostDirs[this.randomPath][1];
        } else {
            this.posX -= this.ghostDirs[this.randomPath][0];
            this.posY -= this.ghostDirs[this.randomPath][1];
            this.collisionDetectedGhost = false;
            this.randomPath = this.randomMoveDir();
        }

    }
}

class Inky extends Ghost {
    constructor(ctx, maze) {
        super(maze);
        this.imgOffsetX = 320;
        this.ctx = ctx;
        this.posX = 308;
        this.posY = 380;
        this.color = "blue";
        this.destination = [125, 116];
    }
}
class Pinky extends Ghost {
    constructor(ctx, maze) {
        super(maze);
        this.imgOffsetX = 0;
        this.ctx = ctx;
        this.posX = 345;
        this.posY = 380;
        this.color = "pink";
        this.destination = [550, 125];
    }
}

class Blinky extends Ghost {
    constructor(ctx, maze) {
        super(maze);
        this.imgOffsetX = 160;
        this.ctx = ctx;
        this.posX = 345;
        this.posY = 350;
        this.color = "red";
        this.destination = [500, 300];
    }
}

class Clyde extends Ghost {
    constructor(ctx, maze) {
        super(maze);
        this.imgOffsetX = 160 * 3;
        this.ctx = ctx;
        this.posX = 308;
        this.posY = 350;
        this.color = "orange";
        this.destination = [125, 300];
    }
}

module.exports = { 
    ghost: Ghost,
    inky: Inky,
    pinky: Pinky,
    clyde: Clyde,
    blinky: Blinky
 }

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


const GameView = __webpack_require__(/*! ./gameView */ "./src/gameView.js");

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 870;
  canvasEl.height = 770;
  const ctx = canvasEl.getContext("2d");
  const game = new GameView(ctx);
  game.keyBinds();
  game.play();
});


/***/ }),

/***/ "./src/maze.js":
/*!*********************!*\
  !*** ./src/maze.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(/*! ./tile */ "./src/tile.js");
const Pellet = __webpack_require__(/*! ./pellet */ "./src/pellet.js");
const TunnelPiece = __webpack_require__(/*! ./tunnelPiece */ "./src/tunnelPiece.js");

class Maze {
  constructor(ctx) {
    this.radius = 10;
    this.ctx = ctx;
    this.width = 700;
    this.height = 770;
    // debugger
    // bitmap for the grid
    (this.grid = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 4, 4, 1, 1, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 6, 6, 7, 6, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 1, 6, 6, 6, 6, 1, 0, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]),
      (this.blocksize = Math.ceil(this.width / this.grid[0].length));
    this.tiles = this.tiles();
    this.tunnelPieces = this.tunnelPieces();
    this.pellets = this.pellets();
  }

  tiles() {
    // debugger
    let tiles = [];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] === 1) {
          let tile = new Tile(
            j * this.blocksize,
            i * this.blocksize,
            this.blocksize,
            this.blocksize
          );
          tiles.push(tile);
        }
      }
    }
    return tiles;
  }
  tunnelPieces() {
    // debugger
    let tunnelPieces = [];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j <= this.grid[i].length; j++) {
        if (this.grid[i][j] === 0) {
          let tunnelPiece = new TunnelPiece(
            j * this.blocksize,
            i * this.blocksize,
            this.blocksize,
            this.blocksize,
            [j, i]
          );
          tunnelPieces.push(tunnelPiece);
        }
      }
    }
    return tunnelPieces;
  }

  pellets() {
    // debugger
    let pellets = [];

    for (let i = 0; i < this.grid.length; i += 1) {
      for (let j = 0; j < this.grid[i].length; j += 1) {
        if (this.grid[i][j] === 0) {
          let pellet = new Pellet(
            j * this.blocksize,
            i * this.blocksize,
            this.blocksize,
            this.blocksize
          );
          pellets.push(pellet);
        }
      }
    }
    return pellets;
  }
  draw(ctx) {
    this.drawBackground(ctx);
    this.drawTunnelPieces(ctx);
    this.drawPellets(ctx);

    this.drawTiles(ctx);
  }

  drawBackground(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.width, this.height);
  }

  drawTiles(ctx) {
    this.tiles.forEach(tile => tile.draw(ctx));
  }

  drawTunnelPieces(ctx) {
    this.tunnelPieces.forEach(tunnelPiece => tunnelPiece.draw(ctx));
  }

  drawPellets(ctx) {
    // debugger
    this.pellets.forEach(pellet => pellet.draw(ctx));
  }
}

module.exports = Maze;


/***/ }),

/***/ "./src/movingCritter.js":
/*!******************************!*\
  !*** ./src/movingCritter.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

class MovingCritter {
  constructor(maze) {
    this.frameCount = 0;
    this.maze = maze;
    this.velX = 0;
    this.velY = 0;
    this.posX = 0;
    this.posY = 0;
    this.collisionDetected = false;
    this.collisionDetectedGhost = false;
    this.moveInput = [];
    this.currentPosition = null;
    this.destinationPosX = 7 * 44;
    this.destinationPosY = 13 * 44;
    this.detectWallCollision = this.detectWallCollision.bind(this);

    this.directions = {
      up: [0, -1],
      down: [0, 1],
      left: [-1, 0],
      right: [1, 0]
    };
  }

  checkDir() {
    // debugger
    this.detectWallCollision();
    if (this.collisionDetected === true) {
      this.collisionDetectedGhost = true;
      this.moveStop();
    }
    this.collisionDetected = false;
  }
  detectWallCollision() {
    // debugger
    this.maze.tiles.forEach(tile => {
      if (this.isPointInTile(tile)) {
        this.collisionDetected = true;
      }
    });
  }

  // checkMove(critterPosition) {
  //     debugger
  //     let nextXPos = critterPosition[0] + this.directions[this.moveInput[0][0]];
  //     let nextYPos = critterPosition[1] + this.directions[this.moveInput[0][1]];

  //     this.maze.tunnelPieces.forEach(tunnelPiece => {
  //         if ([nextXPos, nextYPos] === tunnelPiece.position) {
  //             critterPosition = [nextXPos, nextYPos];
  //         }
  //         this.moveInput.shift();
  //     })
  // }

  isPointInTile(tile) {
    let tileXMin = tile.xPos;
    let tileXMax = tile.xPos + tile.width;
    let tileYMin = tile.yPos;
    let tileYMax = tile.yPos + tile.height;

    let critterXMin = this.posX;
    let critterXMax = this.posX + this.width;
    let critterYMin = this.posY;
    let critterYMax = this.posY + this.width;
    // console.log(critterXMax, critterXMin)
    return (
      ((critterXMin >= tileXMin && critterXMin < tileXMax) ||
        (critterXMax > tileXMin && critterXMax <= tileXMax)) &&
      ((critterYMin >= tileYMin && critterYMin < tileYMax) ||
        (critterYMax > tileYMin && critterYMax <= tileYMax))
    );
  }

  updateFrameCount() {
    this.frameCount += 1;
    this.frameCount = this.frameCount % 60;
  }

  animateMove(startingPos, destinationPos) {
    this.currentPixelPos = startingPos;
    // debugger
    if (this.currentPixelPos > destinationPos) {
      return (this.currentPixelPos -= 4)
    } else if (this.currentPixelPos < destinationPos) {
      return (this.currentPixelPos += 4)
    } else if (this.currentPixelPos === destinationPos) {
      return destinationPos;
    }
    return this.currentPixelPos;
  }

  newDestination(prevXpos, prevYpos) {
    // debugger
    if (prevXpos != this.position[0]) {
      this.destinationPosX = this.position[0] * 44;
    } else if (prevYpos != this.position[1]) {
      this.destinationPosY = this.position[1] * 44;
    }
    // this.posX += this.velX;
    // this.posY += this.velY;
  }

  moveLeft() {
    this.moveInput.push("left");
  }

  moveRight() {
    this.moveInput.push("right");
  }

  moveUp() {
    this.moveInput.push("up");
  }

  moveDown() {
    this.moveInput.push("down");
  }

  moveStop() {
    // this.posX -= this.velX;
    // this.posY -= this.velY;
    // this.velX = 0;
    // this.velY = 0;
  }
}

module.exports = MovingCritter;


/***/ }),

/***/ "./src/msPac.js":
/*!**********************!*\
  !*** ./src/msPac.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingCritter = __webpack_require__(/*! ./movingCritter */ "./src/movingCritter.js");

const msPacImg = new Image();
msPacImg.src = "./MsPac.png";

class MsPac extends MovingCritter {
  constructor(ctx, velX, velY, maze, frameCount) {
    super(velX, velY, maze, frameCount);
    this.ctx = ctx;
    this.width = 44;
    this.radius = 25;
    this.position = [7, 13];
    this.posX = this.position[0] * 44;
    this.posY = this.position[1] * 44;
    this.lives = 3;
    this.score = 0;

    this.msPacImg = msPacImg;
  }

  draw(ctx) {
    // debugger

    ctx.fillStyle = "red";
    if (this.posX != this.destinationPosX) {
      this.posX = this.animateMove(this.posX, this.destinationPosX);
      this.posX = Math.floor(this.posX);
    } else if (this.posY != this.destinationPosY) {
      this.posY = this.animateMove(this.posY, this.destinationPosY);
      this.posY = Math.floor(this.posY)
    }

    ctx.fillRect(this.posX, this.posY, this.width, this.width);
    // this.updateFrameCount();
    // this.imgFrameSelect(ctx);
  }


  imgFrameSelect(ctx) {
    if (this.velX > 0) {
      if (this.frameCount % 15 === 0) {
        return ctx.drawImage(
          this.msPacImg,
          160,
          0,
          160,
          160,
          this.posX - 21,
          this.posY - 9,
          this.width * 2,
          this.width * 2
        );
      } else {
        return ctx.drawImage(
          this.msPacImg,
          0,
          0,
          160,
          160,
          this.posX - 21,
          this.posY - 9,
          this.width * 2,
          this.width * 2
        );
      }
    } else if (this.velX < 0) {
      if (this.frameCount % 15 === 0) {
        return ctx.drawImage(
          this.msPacImg,
          320 + 160,
          0,
          160,
          160,
          this.posX - 15,
          this.posY - 9,
          this.width * 2,
          this.width * 2
        );
      } else {
        return ctx.drawImage(
          this.msPacImg,
          320,
          0,
          160,
          160,
          this.posX - 15,
          this.posY - 9,
          this.width * 2,
          this.width * 2
        );
      }
    } else if (this.velY > 0) {
      if (this.frameCount % 15 === 0) {
        return ctx.drawImage(
          this.msPacImg,
          960 + 160,
          0,
          160,
          160,
          this.posX - 30,
          this.posY - 9 - 12.5,
          this.width * 2,
          this.width * 2
        );
      } else {
        return ctx.drawImage(
          this.msPacImg,
          960,
          0,
          160,
          160,
          this.posX - 30,
          this.posY - 9 - 12.5,
          this.width * 2,
          this.width * 2
        );
      }
    } else if (this.velY < 0) {
      if (this.frameCount % 15 === 0) {
        return ctx.drawImage(
          this.msPacImg,
          640 + 160,
          0,
          160,
          160,
          this.posX - 10,
          this.posY - 9 - 5,
          this.width * 2,
          this.width * 2
        );
      } else {
        return ctx.drawImage(
          this.msPacImg,
          640,
          0,
          160,
          160,
          this.posX - 10,
          this.posY - 9 - 5,
          this.width * 2,
          this.width * 2
        );
      }
    } else {
      return ctx.drawImage(
        this.msPacImg,
        0,
        0,
        160,
        160,
        this.posX - 21,
        this.posY - 9,
        this.width * 2,
        this.width * 2
      );
    }
  }
}

module.exports = MsPac;


/***/ }),

/***/ "./src/pellet.js":
/*!***********************!*\
  !*** ./src/pellet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {



class Pellet {
    constructor(posX, posY, width, height) {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.point = 10;
    }

    draw(ctx) {
   
        // debugger
        ctx.fillStyle = "black";
        ctx.fillRect(this.posX, this.posY, this.width, this.height);

        ctx.fillStyle = "white"
        ctx.beginPath();
        //43 === width/height of each pellet's square
        ctx.arc((this.posX + (43/2)), (this.posY + (43/2)), this.width / 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke()
    }

    findCenter() {
        let centerFromX = this.posX + this.width;
        let centerFromY = this.posY + this.height;
    }
}


module.exports = Pellet;

/***/ }),

/***/ "./src/tile.js":
/*!*********************!*\
  !*** ./src/tile.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Tile {
  constructor(xPos, yPos, width, height) {
    // debugger
    this.width = width;
    this.height = height;
    this.xPos = xPos;
    this.yPos = yPos;
  }

  draw(ctx) {
    ctx.fillStyle = "#ffb591";
    //#ff7f63
    ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
  }
}

module.exports = Tile;


/***/ }),

/***/ "./src/tunnelPiece.js":
/*!****************************!*\
  !*** ./src/tunnelPiece.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

class TunnelPiece {
    constructor(xPos, yPos, width, height, position) {
        // debugger
        this.width = width;
        this.height = height;
        this.xPos = xPos;
        this.yPos = yPos;
        this.position = position;
    }

    draw(ctx) {
        //#ff7f63
        this.fillStyle = "black"
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}

module.exports = TunnelPiece;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map