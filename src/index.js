
const GameView = require("./gameView");

document.addEventListener("DOMContentLoaded", function() {

  const canvasEl = document.getElementById("myCanvas");
  canvasEl.width = 870;
  canvasEl.height = 790;
  const ctx = canvasEl.getContext("2d");
  const game = new GameView(ctx);
  game.keyBinds();
  game.play();
});
