const Game = require("./game");
const GameView = require("./gameView");

document.addEventListener("DOMContentLoaded", function () {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = 800;
    canvasEl.height = 600;

    const ctx = canvasEl.getContext("2d");
    const game = new Game(ctx);
    new GameView(game, ctx).play();
});