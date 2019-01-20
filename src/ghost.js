const MovingCritter = require("./movingCritter");

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
    this.width = 45;
    this.height = 45;
    this.scared = false;
    // this.randomPath = this.randomMoveDir();
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

    // ghostRoute() {
    //     if (this.frameCount % 5 ) {
    //         this.routeToDestination();
    //     } else if (this.frameCount >= 30) {
    //         this.randomRoute();
    //     }
    // }

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
        // let dirs = ["up", "down", "left", "right"]
        this.destination = [posX, posY];
        // return dirs[selected]
    }

    calculateNewPath(gameStartTime) {
        let currentTime = Date.now() / 1000;

        if (currentTime - gameStartTime >= 60) {
            this.destination = this.randomPath;
        } else if (currentTime - gameStartTime >= 120) {
            
        }
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
        this.posX = 325;
        this.posY = 350;
        this.color = "blue";
        this.destination = [125, 116];
        // this.randomMove();
    }
}
class Pinky extends Ghost {
    constructor(ctx, maze) {
        super(maze);
        this.imgOffsetX = 0;
        this.ctx = ctx;
        this.posX = 325;
        this.posY = 350;
        this.color = "pink";
        this.destination = [550, 125];
        // this.randomMove();
    }
}

class Blinky extends Ghost {
    constructor(ctx, maze) {
        super(maze);
        this.imgOffsetX = 160;
        this.ctx = ctx;
        this.posX = 325;
        this.posY = 350;
        this.color = "red";
        this.destination = [500, 300];
        // this.randomMove();
    }
}

class Clyde extends Ghost {
    constructor(ctx, maze) {
        super(maze);
        this.imgOffsetX = 160 * 3;
        this.ctx = ctx;
        this.posX = 325;
        this.posY = 350;
        this.color = "orange";
        this.destination = [125, 300];
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