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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const msPac = __webpack_require__(/*! ./msPac */ "./src/msPac.js");
// const Maze = require('./maze');

// class Game {
//     constructor(ctx, msPac) {
//         this.ctx = ctx;
//         this.msPac = msPac;
//         // this.maze = new Maze(ctx);
//     }

//     draw(ctx) {
//         // this.maze.draw(this.ctx);
//         // ctx.beginPath()
//         // ctx.fillStyle = "#000000";
//         // ctx.fillRect(0,0, 700, 700);
//     }

//     positionToBounds() {
//         //hash obj that stores updated TOP/BOTTOM/LEFY/RIGHT
//         //can use this
//     }

// }

// // const boardHeight = 1000;
// // const boardWidth = 600;
// module.exports = Game;


/***/ }),

/***/ "./src/gameView.js":
/*!*************************!*\
  !*** ./src/gameView.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game */ "./src/game.js")
const MsPac = __webpack_require__(/*! ./msPac */ "./src/msPac.js");
const Inky = __webpack_require__(/*! ./ghost */ "./src/ghost.js");
const Maze = __webpack_require__(/*! ./maze */ "./src/maze.js");
const Util = __webpack_require__(/*! ./util */ "./src/util.js");

class GameView {
    constructor(ctx) {
        this.ctx = ctx;
        this.msPac = new MsPac(this.ctx);
        this.ghostHouse = [];
        this.inky = new Inky(this.ctx);
        // this.game = new Game(this.ctx, this.msPac);
        this.keyPressed = [];
        this.maze = new Maze(this.ctx);

        this.keyBinds = this.keyBinds.bind(this);
    }

    keyBinds() {
        //keyCodes obtained here: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode#Value_of_keyCode
        document.addEventListener("keydown", (e) => {
            if (e.code === "KeyD" && this.keyPressed.length <= 1) {
                this.keyPressed.push(e.code)
                this.msPac.moveRight();
            } 
            if (e.code === "KeyA" && this.keyPressed.length <= 1) {
                this.keyPressed.push(e.code)
                this.msPac.moveLeft();
            } 
            if (e.code === "KeyW" && this.keyPressed.length <= 1) {
                this.keyPressed.push(e.code)
                this.msPac.moveUp();
            } 
            if (e.code === "KeyS" && this.keyPressed.length <= 1) {
                this.keyPressed.push(e.code)
                this.msPac.moveDown();
            }
        })

        document.addEventListener("keyup", (e) => {
            // this.msPac.moveStop();
            this.keyPressed.pop();
        })
    }

    play() {
        // debugger
        this.keyBinds();
        requestAnimationFrame(this.animate.bind(this));
    }

    animate() {
        // this.game.draw(this.ctx);
        this.detectWallCollision();
        this.updatePos();
        this.drawUnits();
        requestAnimationFrame(this.animate.bind(this));
    }

    updatePos() {
        this.msPac.newPos();
    }

    drawUnits() {
        this.maze.draw(this.ctx);
        this.msPac.draw(this.ctx);

        // debugger
        // this.inky.draw(this.ctx);
    }

    detectWallCollision() {
        // debugger
        // let distanceBetween;
        // let tileCenter = new Array(2);
        this.maze.tiles.forEach( (tile) => {
            // debugger
            // tileCenter[0] = Math.floor(tile.xPos) + (Math.floor(tile.width / 2));
            // tileCenter[1] = Math.floor(tile.yPos) + (Math.floor(tile.height / 2));
            // // console.log(tileCenter)
            // distanceBetween = Util.distance(tileCenter, [this.msPac.posX, this.msPac.posY])
            // if (Math.floor(distanceBetween) < this.msPac.radius) {
            //     // debugger
            //     console.log("collision detect")
            //     this.msPac.posX -= this.msPac.velX;
            //     this.msPac.posY -= this.msPac.velY;
            //     this.msPac.moveStop();
                
            // }
            
            if (this.isPointInTile(this.msPac, tile)) {
                console.log(this.msPac.posX)
                console.log("collision")
                this.msPac.posX -= this.msPac.velX;
                this.msPac.posY -= this.msPac.velY;
                this.msPac.moveStop();
            }
        })
    }

    isPointInTile(critter, tile) {
        let tileXMin = tile.xPos;
        let tileXMax = tile.xPos + tile.width;;
        let tileYMin = tile.yPos;
        let tileYMax = tile.yPos + tile.height;

        let critterXMin = critter.posX;
        let critterXMax = critter.posX + critter.width;
        let critterYMin = critter.posY;
        let critterYMax = critter.posY + critter.width;
        // console.log(critterXMax, critterXMin)
        return (
            ((critterXMin >= tileXMin && critterXMin < tileXMax) ||
             (critterXMax > tileXMin && critterXMax <= tileXMax)) && 
            ((critterYMin >= tileYMin && critterYMin < tileYMax) ||
             (critterYMax > tileYMin && critterYMax <= tileYMax))
        )
    }

    detectTunnelTravel() {
        
    }
}

module.exports = GameView;


/***/ }),

/***/ "./src/ghost.js":
/*!**********************!*\
  !*** ./src/ghost.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Ghost {
    constructor(ctx) {
    this.ctx = ctx;
    this.radius = 15;
    this.scared = false;
    // this.color = 'yellow';
    // this.posX = 100;
    // this.posY = 100;
    this.velX = 0;
    this.velY = 0;

    this.newPos = function () {
        this.posX += this.velX;
        this.posY += this.velY;
        }
    }


    draw(ctx) {
        // debugger
       this.newPos();
       ctx.fillStyle = `${this.color}`;
       ctx.beginPath();
       ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI)
       ctx.fill();
       ctx.stroke();
    }

    chaseMsPac(msPacPos) {

    }
    
    validMove() {

    }
}

class Inky extends Ghost {
    constructor(ctx) {
        super();
        this.ctx = ctx;

        this.posX = 280;
        this.posY = 310;
        this.color = "blue";
    }
}

module.exports = Ghost;
module.exports = Inky;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game */ "./src/game.js");
const GameView = __webpack_require__(/*! ./gameView */ "./src/gameView.js");

document.addEventListener("DOMContentLoaded", function () {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = 700;
    canvasEl.height = 750;

    const ctx = canvasEl.getContext("2d");
    // const game = new Game(ctx);
    new GameView(ctx).play();
});



/***/ }),

/***/ "./src/maze.js":
/*!*********************!*\
  !*** ./src/maze.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(/*! ./tile */ "./src/tile.js");

class Maze {
    constructor(ctx) {
        this.radius = 10;
        this.ctx = ctx;
        this.width = 700;
        this.height = 750;
        // bitmap for the grid
        this.grid = [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4, 5, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 6, 7, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            this.blocksize = this.width / (this.grid[0].length);
        this.tiles = this.tiles();
    }

    tiles() {
        let tiles = [];
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                // .75 modifier added to reduce gridlines
                if (this.grid[i][j] === 1) {
                    let tile = new Tile(j * this.blocksize, i * this.blocksize, this.blocksize, this.blocksize);
                    // tile.draw(ctx);
                    tiles.push(tile)
                }
            }
        }
        return tiles;
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, this.width, this.height);
        // debugger

        this.tiles.forEach( tile => tile.draw(ctx))
    }

}

module.exports = Maze;

/***/ }),

/***/ "./src/msPac.js":
/*!**********************!*\
  !*** ./src/msPac.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {


class MsPac {
    constructor(ctx) {
        this.ctx = ctx;
        this.width = 50;
        this.radius = 25;
        this.posX = 325;
        this.posY = 425;
        // this.position = [this.posX, this.posY]
        // this.speed = 5;
        this.velX = 0;
        this.velY = 0;
        this.lives = 3;
        this.score = 0;

        this.newPos = function() {
            this.posX += this.velX;
            this.posY += this.velY;
            // this.position = [this.posX, this.posY]
        }
    }

    draw(ctx) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.posX, this.posY, this.width, this.width);

        // ctx.fillStyle = "yellow"
        // ctx.beginPath();
        // ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        // ctx.fill();
        // ctx.stroke()
        
    }

    //currently incrementing by 3 due to a bug caused by the keyPressed arr in gameView
    moveLeft() {
        this.velY = 0;
        this.velX = this.velX - 1;
    }

    moveRight() {
        this.velY = 0;
        this.velX = this.velX + 1;
    }

    moveUp() {
        this.velX = 0;
        this.velY = this.velY - 1;
    }

    moveDown() {
        this.velX = 0;
        this.velY = this.velY + 1;
    }

    moveStop() {
        this.velX = 0;
        this.velY = 0;
    }
}

module.exports = MsPac;

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
        ctx.fillStyle = "pink";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}

module.exports = Tile;

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

const Util = {
    distance(pos1, pos2) {
        return Math.sqrt(
            Math.pow((pos2[0] - pos1[0]), 2) + Math.pow((pos2[1] - pos1[1]), 2)
        )
    }
}

module.exports = Util;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map