const MovingCritter = require("./movingCritter");

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
        this.purposePath = [666, 145];
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
// module.exports = Inky;
// module.exports = Pinky;
// module.exports = Blinky;
// module.exports = Clyde;