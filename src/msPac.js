
class MsPac {
    constructor(ctx) {
        this.ctx = ctx;
        this.radius = 20;
        this.posX = 100;
        this.posY = 75;
        this.speed = 10;
        this.dx;
    }

    draw(ctx) {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke()
    }

    moveLeft() {
        this.posX = this.posX - 1;
    }

    moveRight() {
        this.posX = this.posX + 1;
    }

    moveUp() {
        this.posY = this.posY - 1;
    }

    moveDown() {
        this.posY = this.posY + 1;
    }
}

module.exports = MsPac;