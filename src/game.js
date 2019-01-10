const msPac = require('./msPac');

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.msPac = new msPac(this.ctx);
    }
    
    draw(ctx) {
        ctx.beginPath()
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0, 800, 600);
        this.msPac.draw(ctx);
    }
}

// const boardHeight = 1000;
// const boardWidth = 600;
module.exports = Game;
