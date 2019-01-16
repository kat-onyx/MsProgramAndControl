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
        this.ctx.clearRect(0, 0, 700, 750)
        this.step();
        this.detectPelletConsumtption();
        this.drawUnits();
        this.updatePos();

        if (this.lives ===0 || this.maze.pellets.length === 0) {
            this.gameOver();
            return;
        }
        requestAnimationFrame(this.animate.bind(this));
    }

    updatePos() {
        this.msPac.newPos();
        // this.inky.newPos();
    }

    step() {
        this.msPac.checkDir();
        this.inky.checkDir();
        this.pinky.checkDir();
        this.clyde.checkDir();
        this.blinky.checkDir();
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

    detectPelletConsumtption() {
        // debugger
        // let pellets = this.maze.pellets[1]
        this.maze.pellets.forEach( (pellet, i) => {
            
            if (this.isPointInTile(this.msPac, pellet)) {
                this.maze.pellets.splice(i, 1)
                return 
                
            }
        })
    }

    isPointInTile(critter, pellet) {
        let pelletXMin = pellet.posX;
        let pelletXMax = pellet.posX + pellet.width;;
        let pelletYMin = pellet.posY;
        let pelletYMax = pellet.posY + pellet.height;

        let critterXMin = critter.posX;
        let critterXMax = critter.posX + critter.width;
        let critterYMin = critter.posY;
        let critterYMax = critter.posY + critter.width;
        // console.log(critterXMax, critterXMin)
        return (
            ((critterXMin >= pelletXMin && critterXMin < pelletXMax) ||
             (critterXMax > pelletXMin && critterXMax <= pelletXMax)) && 
            ((critterYMin >= pelletYMin && critterYMin < pelletYMax) ||
             (critterYMax > pelletYMin && critterYMax <= pelletYMax))
        )
    }

    detectTunnelTravel() {
        
    }

gameOver() {
        this.ctx.font = "30px 'Righteous', cursive";
        // this.ctx.fillRect(325, 425, 50, 50);
        this.ctx.fillStyle = "red";
        this.ctx.fillText("GAME OVER", 265, 465);
        this.ctx.fillStyle = "black";
    }
}

module.exports = GameView;
