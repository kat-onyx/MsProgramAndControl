class MovingCritter {
    constructor() {
        this.velX = 0;
        this.velY = 0;
    }


    moveLeft() {
        this.velY = 0;
        this.velX = this.velX - 3;
    }

    moveRight() {
        this.velY = 0;
        this.velX = this.velX + 3;
    }

    moveUp() {
        this.velX = 0;
        this.velY = this.velY - 3;
    }

    moveDown() {
        this.velX = 0;
        this.velY = this.velY + 3;
    }

    moveStop() {
        this.posX -= this.velX;
        this.posY -= this.velY;
        this.velX = 0;
        this.velY = 0;
    }
}

module.exports = MovingCritter;