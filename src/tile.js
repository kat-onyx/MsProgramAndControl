
class Tile {
    constructor(xPos, yPos, width, height) {
        // debugger
        this.width = width;
        this.height = height;
        this.xPos = xPos;
        this.yPos = yPos;
    }

    draw(ctx) {
        ctx.fillStyle = "pink";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}

module.exports = Tile;