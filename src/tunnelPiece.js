class TunnelPiece {
    constructor(xPos, yPos, width, height, position) {
        // debugger
        this.width = width;
        this.height = height;
        this.xPos = xPos;
        this.yPos = yPos;
        this.position = position;
    }

    draw(ctx) {
        //#ff7f63
        this.fillStyle = "black"
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}

module.exports = TunnelPiece;