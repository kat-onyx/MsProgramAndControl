const Game = require("./game");
const GameView = require("./gameView");

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 700;
  canvasEl.height = 770;

  const ctx = canvasEl.getContext("2d");
  const game = new GameView(ctx);
  game.keyBinds();
  game.play();
});
