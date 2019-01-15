const Game = require('./game')
const MsPac = require('./msPac');
const Inky = require('./ghost').inky;
const Pinky = require('./ghost').pinky;
const Clyde = require('./ghost').clyde;
const Blinky = require('./ghost').blinky;
const Maze = require('./maze');
const Util = require('./util');

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
        // debugger
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
