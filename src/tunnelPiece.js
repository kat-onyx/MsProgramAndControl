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
        ctx.fillStyle = "#000";
        //#ff7f63
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}

module.exports = TunnelPiece;