
class MsPac {
    constructor(ctx) {
        this.ctx = ctx;
        this.radius = 20;
        this.posX = 100;
        this.posY = 75;
        this.speed = 10;
        this.velX = 0;
        this.velY = 0;

        this.newPos = function() {
            this.posX += this.velX;
            this.posY += this.velY;
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

    moveLeft() {
        this.velX = this.velX - 1;
    }

    moveRight() {
        this.velX = this.velX + 1;
    }

    moveUp() {
        this.velY = this.velY - 1;
    }

    moveDown() {
        this.velY = this.velY + 1;
    }

    moveStop() {
        this.velX = 0;
        this.velY = 0;
    }
}

module.exports = MsPac;