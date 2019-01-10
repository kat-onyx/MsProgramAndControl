const Game = require('./game')
const MsPac = require('./msPac');

class GameView {
    constructor(game, ctx) {
        this.game = game;
        this.ctx = ctx;
        this.msPac = new MsPac(ctx);

        this.keyBinds = this.keyBinds.bind(this);
    }

    keyBinds() {
        //keyCodes obtained here: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode#Value_of_keyCode
        document.addEventListener("keydown", (e) => {

            if (e.code === "KeyD") {
                this.msPac.moveRight();
            } 
            if (e.code === "KeyA") {
                this.msPac.moveLeft();
            } 
            if (e.code === "KeyW") {
                this.msPac.moveUp();
            } 
            if (e.code === "KeyS") {
                this.msPac.moveDown();
            }
        })

        document.addEventListener("keyup", (e) => {
            this.msPac.moveStop();
        })
    }
    play() {
        this.keyBinds();
        requestAnimationFrame(this.animate.bind(this));
    }

    animate() {
        this.game.draw(this.ctx);
        this.msPac.draw(this.ctx);
        requestAnimationFrame(this.animate.bind(this));
    }
}

module.exports = GameView;