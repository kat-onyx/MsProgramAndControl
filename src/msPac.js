const MovingCritter = require('./movingCritter');

const msPacImg = new Image();
msPacImg.src = './MsPac.png';

class MsPac extends MovingCritter{
    constructor(ctx, velX, velY, maze) {
        super(velX, velY, maze);
        this.ctx = ctx;
        this.width = 45;
        this.radius = 25;
        this.posX = 325;
        this.posY = 425;
        this.lives = 3;
        this.score = 0;
        this.msPacImg = msPacImg;

        this.newPos = function() {
            this.posX += this.velX;
            this.posY += this.velY;
            // this.position = [this.posX, this.posY]
        }
    }

    draw(ctx) {    
        this.imgFrameSelect(ctx);
    }
    
    imgFrameSelect(ctx) {
        if (this.velX > 0) {
            return ctx.drawImage(this.msPacImg, 0, 0, 160, 160, this.posX - 12.5, this.posY, this.width * 1.5, this.width * 1.5);
        } else if (this.velX < 0) {
            return ctx.drawImage(this.msPacImg, 320 ,0, 160, 160, this.posX - 10, this.posY, this.width * 1.5, this.width * 1.5);
        } else if (this.velY > 0) {
            return ctx.drawImage(this.msPacImg, 960, 0, 160, 160, this.posX - 20, this.posY - 12.5, this.width * 1.5, this.width * 1.5);
        } else if (this.velY < 0) {
            return ctx.drawImage(this.msPacImg, 640, 0, 160, 160, this.posX - 5, this.posY - 5, this.width * 1.5, this.width * 1.5);
        } else {
            return ctx.drawImage(this.msPacImg, 0, 0, 160, 160, this.posX - 12.5, this.posY, this.width * 1.5, this.width * 1.5);
        }
    }
}

module.exports = MsPac;