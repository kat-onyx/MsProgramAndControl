const MovingCritter = require('./movingCritter');

class MsPac extends MovingCritter{
    constructor(ctx, velX, velY, maze) {
        super(velX, velY, maze);
        this.ctx = ctx;
        this.width = 45;
        this.radius = 25;
        this.posX = 325;
        this.posY = 425;
        // this.position = [this.posX, this.posY]
        // this.speed = 5;
        // this.velX = 0;
        // this.velY = 0;
        this.lives = 3;
        this.score = 0;

        this.newPos = function() {
            this.posX += this.velX;
            this.posY += this.velY;
            // this.position = [this.posX, this.posY]
        }
    }

    draw(ctx) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.posX, this.posY, this.width, this.width);

        // ctx.fillStyle = "yellow"
        // ctx.beginPath();
        // ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        // ctx.fill();
        // ctx.stroke()
        
    }

    //currently incrementing by 3 due to a bug caused by the keyPressed arr in gameView
    // moveLeft() {
    //     this.velY = 0;
    //     this.velX = this.velX - 3;
    // }

    // moveRight() {
    //     this.velY = 0;
    //     this.velX = this.velX + 3;
    // }

    // moveUp() {
    //     this.velX = 0;
    //     this.velY = this.velY - 3;
    // }

    // moveDown() {
    //     // this.velX = 0;
    //     this.velY = this.velY + 3;
    // }

    // moveStop() {
    //     this.posX -= this.velX;
    //     this.posY -= this.velY;
    //     this.velX = 0;
    //     this.velY = 0;
    // }
}

module.exports = MsPac;