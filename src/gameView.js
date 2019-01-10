const Game = require('./game')

class GameView {
    constructor(game, ctx) {
        this.game = game;
        this.ctx = ctx;
    }

    animate() {
        this.game.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }
}

module.exports = GameView;