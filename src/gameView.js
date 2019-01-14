const Game = require('./game')
const MsPac = require('./msPac');
const Maze = require('./maze');
const Util = require('./util');

class GameView {
    constructor(ctx) {
        this.ctx = ctx;
        this.msPac = new MsPac(this.ctx);
        // this.game = new Game(this.ctx, this.msPac);
        this.keyPressed = [];
        this.maze = new Maze(this.ctx);

        this.keyBinds = this.keyBinds.bind(this);
    }

    keyBinds() {
        //keyCodes obtained here: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode#Value_of_keyCode
        document.addEventListener("keydown", (e) => {
            console.log(this.keyPressed)
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
        this.maze.draw(this.ctx);
        this.msPac.draw(this.ctx);
       

        requestAnimationFrame(this.animate.bind(this));
    }

    detectWallCollision() {
        // debugger
        let distanceBetween;
        let tileCenter = new Array(2);
        this.maze.tiles.forEach( (tile) => {
            tileCenter[0] = Math.floor(tile.xPos) + (Math.floor(tile.width / 2));
            tileCenter[1] = Math.floor(tile.yPos) + (Math.floor(tile.height / 2));
            // console.log(tileCenter)
            distanceBetween = Util.distance(tileCenter, [this.msPac.posX, this.msPac.posY])
            if (Math.floor(distanceBetween) < this.msPac.radius * 1.5) {
                // debugger
                console.log("collision detect")
                this.msPac.posX -= this.msPac.velX;
                this.msPac.posY -= this.msPac.velY;
                this.msPac.moveStop();
                
            }
        })
    }
}

module.exports = GameView;
