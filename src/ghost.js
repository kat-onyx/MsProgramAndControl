class Ghost {
    constructor(ctx) {
    this.ctx = ctx;
    this.radius = 15;
    this.scared = false;
    // this.color = 'yellow';
    // this.posX = 100;
    // this.posY = 100;
    this.velX = 0;
    this.velY = 0;

    this.newPos = function () {
        this.posX += this.velX;
        this.posY += this.velY;
        }
    }


    draw(ctx) {
        // debugger
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
}

class Inky extends Ghost {
    constructor(ctx) {
        super();
        this.ctx = ctx;

        this.posX = 280;
        this.posY = 310;
        this.color = "blue";
    }
}

module.exports = Ghost;
module.exports = Inky;