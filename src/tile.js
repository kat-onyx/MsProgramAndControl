
class Tile {
    constructor(xPos, yPos, width, height) {
        // debugger
        this.width = width;
        this.height = height;
        this.xPos = xPos;
        this.yPos = yPos;
    }

    draw(ctx) {
        ctx.fillStyle = "#ffb591";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}

module.exports = Tile;