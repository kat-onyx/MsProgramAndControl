const MovingCritter = require("./movingCritter");

class Ghost extends MovingCritter {
    constructor(ctx, velX, velY) {
    super(ctx, velX, velY);
    this.ctx = ctx;
    this.radius = 20;
    this.scared = false;
    // this.color = 'yellow';
    // this.posX = 100;
    // this.posY = 100;
    // this.velX = 0;
    // this.velY = 0;

    this.newPos = function () {
        this.posX += this.velX;
        this.posY += this.velY;
        }
    }


    draw(ctx) {
        // debugger
       this.randomMove();
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

    randomMove() {
        let selected = Math.floor(Math.random() * 4)
        // console.log(selected)
        if (selected === 3) {
            this.moveDown();
        } else if (selected === 2) {
            this.moveUp();
        } else if (selected === 1) {
            this.moveLeft();
        } else {
            this.moveRight();
        }
        
    }
}

class Inky extends Ghost {
    constructor(ctx) {
        super();
        this.ctx = ctx;

        this.posX = 300;
        this.posY = 375;
        this.color = "blue";

        this.randomMove();
    }
}

module.exports = Ghost;
module.exports = Inky;