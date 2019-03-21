const MovingCritter = require("./movingCritter");

const ghostsImg = new Image();
ghostsImg.loaded = false;
ghostsImg.onload = function() {
    this.loaded = true;
}
ghostsImg.src = '../dist/assets/images/ghost.png';

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
        "up": [0, -2],
        "down": [0, 2],
        "left": [-2, 0],
        "right": [2, 0]
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