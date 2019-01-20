const Game = require("./game");
const GameView = require("./gameView");

document.addEventListener("DOMContentLoaded", function () {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = 700;
    canvasEl.height = 790;

    const ctx = canvasEl.getContext("2d");
    new GameView(ctx).play();
});

