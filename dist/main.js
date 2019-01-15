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
const Pinky = __webpack_require__(/*! ./ghost */ "./src/ghost.js");
const Clyde = __webpack_require__(/*! ./ghost */ "./src/ghost.js");
const Blinky = __webpack_require__(/*! ./ghost */ "./src/ghost.js");
const Maze = __webpack_require__(/*! ./maze */ "./src/maze.js");
const Util = __webpack_require__(/*! ./util */ "./src/util.js");

class GameView {
    constructor(ctx) {
        this.ctx = ctx;
        
        this.ghostHouse = [];
        
        // this.game = new Game(this.ctx, this.msPac);
        this.keyPressed = [];
        this.maze = new Maze(this.ctx);
        this.msPac = new MsPac(this.ctx, this.maze);
        this.inky = new Inky(this.ctx, this.maze);
        this.pinky = new Pinky(this.ctx, this.maze);
        this.blinky = new Blinky(this.ctx, this.maze);
        this.clyde = new Clyde(this.ctx, this.maze);
        this.keyBinds = this.keyBinds.bind(this);

        // this.detectWallCollision = this.detectWallCollision.bind(this);
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
        
        // this.detectWallCollision(this.msPac);
        this.msPac.checkDir();
        this.inky.checkDir();
        this.pinky.checkDir();
        this.clyde.checkDir();
        this.blinky.checkDir();
        this.drawUnits();
        this.updatePos();
        requestAnimationFrame(this.animate.bind(this));
    }

    updatePos() {
        this.msPac.newPos();
        // this.inky.newPos();
    }

    drawUnits() {
        this.maze.draw(this.ctx);
        this.msPac.draw(this.ctx);

        // debugger
        this.inky.draw(this.ctx);
        this.pinky.draw(this.ctx);
        this.blinky.draw(this.ctx);
        this.clyde.draw(this.ctx);
    }

    // checkDir(critter) {
    //     // console.log("loop")
    //     // debugger
    //     this.detectWallCollision(critter);
    //     if (this.collisionDetected === true) {
    //         critter.moveStop();
    //     }
    //     this.collisionDetected = false;

    //     let ghostDirs = {
    //         "Up": [0, 1],
    //         "Down": [-1, 0],
    //         "Left": [0, 1],
    //         "Right": [0, -1]
    //     }
    // }
    // detectWallCollision(critter) {
    //     // debugger
    //     this.maze.tiles.forEach( (tile) => {
            
    //         if (this.isPointInTile(critter, tile)) {
    //             // console.log(this.msPac.posX)
    //             // console.log("collision")
    //             this.collisionDetected = true;
    //             console.log(this.collisionDetected)
    //             // this.msPac.moveStop();
    //             return 
                
    //         }
    //     })
    // }

    // isPointInTile(critter, tile) {
    //     let tileXMin = tile.xPos;
    //     let tileXMax = tile.xPos + tile.width;;
    //     let tileYMin = tile.yPos;
    //     let tileYMax = tile.yPos + tile.height;

    //     let critterXMin = critter.posX;
    //     let critterXMax = critter.posX + critter.width;
    //     let critterYMin = critter.posY;
    //     let critterYMax = critter.posY + critter.width;
    //     // console.log(critterXMax, critterXMin)
    //     return (
    //         ((critterXMin >= tileXMin && critterXMin < tileXMax) ||
    //          (critterXMax > tileXMin && critterXMax <= tileXMax)) && 
    //         ((critterYMin >= tileYMin && critterYMin < tileYMax) ||
    //          (critterYMax > tileYMin && critterYMax <= tileYMax))
    //     )
    // }

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
/***/ (function(module, exports, __webpack_require__) {

const MovingCritter = __webpack_require__(/*! ./movingCritter */ "./src/movingCritter.js");

class Ghost extends MovingCritter {
    constructor(ctx, velX, velY) {
    super(ctx, velX, velY);
    this.ctx = ctx;
    this.radius = 20;
    this.width = 45;
    this.scared = false;
    this.randomPath = this.randomMoveDir();
    this.purposePath = null;
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
        // debugger
    //    this.tryMove();
       this.routeToDestination();
       this.newPos();
       
       ctx.fillStyle = `${this.color}`;
       ctx.fillRect(this.posX, this.posY, this.width, this.width);
    //    ctx.fillStyle = `${this.color}`;
    //    ctx.beginPath();
    //    ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI)
    //    ctx.fill();
    //    ctx.stroke();
    }

    chaseMsPac(msPacPos) {

    }

    tryMove() {
        if (this.collisionDetectedGhost === false ) {
            // console.log(this.collisionDetected)
            this.posX += this.ghostDirs[this.randomPath][0];
            this.posY += this.ghostDirs[this.randomPath][1];
        } else {
            this.posX -= this.ghostDirs[this.randomPath][0];
            this.posY -= this.ghostDirs[this.randomPath][1];
            this.collisionDetectedGhost = false;
            this.randomPath = this.randomMoveDir();
        }

    }

    calculateDestPath() {
        this.destination = this.purposePath;
        // debugger

        // if ()
        for (let k in this.ghostDirs) {
            let possibleDest = [
                this.posX + this.ghostDirs[k][0],
                this.posY + this.ghostDirs[k][1]
            ]
            if (possibleDest[0] < this.posX && this.destination[0] < this.posX) {
                if (this.possiblePaths.indexOf(this.ghostDirs["left"]) === -1) {
                    this.possiblePaths.push(this.ghostDirs["left"])
                } 
            } else if (possibleDest[0] > this.posX && this.destination[0] > this.posX) {
                if (this.possiblePaths.indexOf(this.ghostDirs["right"]) === -1) {
                    this.possiblePaths.push(this.ghostDirs["right"])
                }
            } else if (possibleDest[1] > this.posY && this.destination[1] > this.posY) {
                // console.log(possibleDest[1], this.destination[1])
                if (this.possiblePaths.indexOf(this.ghostDirs["down"]) === -1) {
                    this.possiblePaths.push(this.ghostDirs["down"])
                }
            } else if (possibleDest[1] < this.posY && this.destination[1] < this.posY) {
                if (this.possiblePaths.indexOf(this.ghostDirs["up"]) === -1) {
                this.possiblePaths.push(this.ghostDirs["up"])
                }
            }
        }
    }


    routeToDestination() {
        // debugger
        // console.log(this.collisionDetectedGhost)
        this.calculateDestPath();
        // if (this.possiblePaths.length === 0 || this.collisionDetectedGhost) {
        //     // debugger

               
        //     // return this.tryMove();
        // }
        
        // for(let i = 0; i < this.possiblePaths.length; i++) {
            if (this.collisionDetectedGhost === false) {
                this.posX += this.possiblePaths[0][0];
                this.posY += this.possiblePaths[0][1];
            } else {
                this.posX -= this.possiblePaths[0][0];
                this.posY -= this.possiblePaths[0][1];
                this.collisionDetectedGhost = false;
                this.possiblePaths.splice(0, 1);
                
                // return
            }
        // }
    }

    randomMoveDir() {
        let selected = Math.floor(Math.random() * 4)
        let dirs = ["up", "down", "left", "right"]
        return dirs[selected]
    }
}

class Inky extends Ghost {
    constructor(ctx, maze) {
        super(maze);
        this.ctx = ctx;
        this.posX = 325;
        this.posY = 350;
        this.color = "blue";
        this.purposePath = [125, 116];
        // this.randomMove();
    }
}
class Pinky extends Ghost {
    constructor(ctx, maze) {
        super(maze);
        this.ctx = ctx;
        this.posX = 325;
        this.posY = 350;
        this.color = "pink";
        this.purposePath = [125, 145];
        // this.randomMove();
    }
}

class Blinky extends Ghost {
    constructor(ctx, maze) {
        super(maze);
        this.ctx = ctx;
        this.posX = 325;
        this.posY = 350;
        this.color = "red";
        this.purposePath = [125, 400];
        // this.randomMove();
    }
}

class Clyde extends Ghost {
    constructor(ctx, maze) {
        super(maze);
        this.ctx = ctx;
        this.posX = 325;
        this.posY = 350;
        this.color = "orange";
        this.purposePath = [125, 300];
        // this.randomMove();
    }
}

module.exports = Ghost;
module.exports = Inky;
module.exports = Pinky;
module.exports = Blinky;
module.exports = Clyde;

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
                [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4, 5, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 6, 7, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
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

/***/ "./src/movingCritter.js":
/*!******************************!*\
  !*** ./src/movingCritter.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

class MovingCritter {
    constructor(maze) {
        // debugger
        this.maze = maze;
        this.velX = 0;
        this.velY = 0;
        this.posX = 0;
        this.posY = 0;
        this.collisionDetected = false;
        this.collisionDetectedGhost = false;
        // this.collisionDetectedmsPac = false;
        this.detectWallCollision = this.detectWallCollision.bind(this);
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
        this.maze.tiles.forEach((tile) => {
            if (this.isPointInTile(tile)) {
                this.collisionDetected = true;
            }
        })
    }

    isPointInTile(tile) {
        let tileXMin = tile.xPos;
        let tileXMax = tile.xPos + tile.width;;
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
        )
    }
    moveLeft() {
        this.velY = 0;
        this.velX = this.velX - 3;
    }

    moveRight() {
        this.velY = 0;
        this.velX = this.velX + 3;
    }

    moveUp() {
        this.velX = 0;
        this.velY = this.velY - 3;
    }

    moveDown() {
        this.velX = 0;
        this.velY = this.velY + 3;
    }

    moveStop() {
        this.posX -= this.velX;
        this.posY -= this.velY;
        this.velX = 0;
        this.velY = 0;
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

class MsPac extends MovingCritter{
    constructor(ctx, velX, velY, maze) {
        super(velX, velY, maze);
        this.ctx = ctx;
        this.width = 45;
        this.radius = 25;
        this.posX = 325;
        this.posY = 425;
        // this.position = [this.posX, this.posY]
        // this.speed = 5;
        // this.velX = 0;
        // this.velY = 0;
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
    // moveLeft() {
    //     this.velY = 0;
    //     this.velX = this.velX - 3;
    // }

    // moveRight() {
    //     this.velY = 0;
    //     this.velX = this.velX + 3;
    // }

    // moveUp() {
    //     this.velX = 0;
    //     this.velY = this.velY - 3;
    // }

    // moveDown() {
    //     // this.velX = 0;
    //     this.velY = this.velY + 3;
    // }

    // moveStop() {
    //     this.posX -= this.velX;
    //     this.posY -= this.velY;
    //     this.velX = 0;
    //     this.velY = 0;
    // }
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
        ctx.fillStyle = "#ffb591";
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