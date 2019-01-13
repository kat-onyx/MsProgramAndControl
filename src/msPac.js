
class MsPac {
    constructor(ctx) {
        this.ctx = ctx;
        this.radius = 15;
        this.posX = 315;
        this.posY = 405;
        // this.position = [this.posX, this.posY]
        this.speed = 10;
        this.velX = 0;
        this.velY = 0;
        this.lives = 3;
        this.score = 0;

        this.newPos = function() {
            this.posX += this.velX;
            this.posY += this.velY;
            // this.position = [this.posX, this.posY]
        }
    }

    draw(ctx) {
        this.newPos();
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke()
    }

    //currently incrementing by 3 due to a bug caused by the keyPressed arr in gameView
    moveLeft() {
        this.velX = this.velX - 3;
    }

    moveRight() {
        this.velX = this.velX + 3;
    }

    moveUp() {
        this.velY = this.velY - 3;
    }

    moveDown() {
        this.velY = this.velY + 3;
    }

    moveStop() {
        this.velX = 0;
        this.velY = 0;
    }
}

module.exports = MsPac;