const MovingCritter = require("./movingCritter");

const ghostsImg = new Image();
ghostsImg.loaded = false;
ghostsImg.onload = function() {
    this.loaded = true;
    console.log(this.loaded)
}
ghostsImg.src = './ghost.png';

const msPacImg = new Image();
msPacImg.src = './MsPac.png';

class Ghost extends MovingCritter {
    constructor(ctx, velX, velY) {
    super(ctx, velX, velY);
    this.ctx = ctx;
    this.ghostsImg = ghostsImg;
    this.msPacImg = msPacImg;
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
       this.routeToDestination();
       this.newPos();
       this.selectGhostImg(ctx);
    }

    // chaseMsPac(msPacPos) {
        //TODO: Implement chasing mechanism.
    // }

    selectGhostImg(ctx) {
        let offsetX = null;
        if (this instanceof Inky) {
            offsetX = 320;
        } else if (this instanceof Pinky) {
            offsetX = 0;
        } else if (this instanceof Clyde) {
            offsetX = (160 * 3);
        } else if (this instanceof Blinky) {
            offsetX = 160;
        }
        return ctx.drawImage(this.ghostsImg, offsetX, 0, 160, 160, this.posX - 5, this.posY - 5, this.width * 1.5, this.width * 1.5)
    }

    tryMove() {
        if (this.collisionDetectedGhost === false ) {
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
        this.calculateDestPath();

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
        this.purposePath = [550, 125];
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
        this.purposePath = [500, 300];
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

module.exports = { 
    ghost: Ghost,
    inky: Inky,
    pinky: Pinky,
    clyde: Clyde,
    blinky: Blinky
 }