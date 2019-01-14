const Game = require('./game')
const MsPac = require('./msPac');
const Inky = require('./ghost');
const Maze = require('./maze');
const Util = require('./util');

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
