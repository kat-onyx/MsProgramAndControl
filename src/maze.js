const Tile = require("./tile");
const Pellet = require("./pellet");
const TunnelPiece = require("./tunnelPiece");

class Maze {
  constructor(ctx) {
    this.radius = 10;
    this.ctx = ctx;
    this.width = 700;
    this.height = 770;
    // bitmap for the grid
    this.grid = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 4, 4, 1, 1, 0, 1, 1, 1, 1],
      [2, 0, 0, 0, 0, 1, 6, 6, 7, 6, 1, 0, 0, 0, 0, 2],
      [1, 1, 1, 1, 0, 1, 6, 6, 6, 6, 1, 0, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 2, 0, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    this.blocksize = Math.ceil(this.width / this.grid[0].length);
    this.tiles = this.tiles();
    this.tunnelPieces = this.tunnelPieces();
    this.pellets = this.pellets();
  }

  tiles() {
    let tiles = [];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] === 1) {
          let tile = new Tile(
            j * this.blocksize,
            i * this.blocksize,
            this.blocksize,
            this.blocksize
          );
          tiles.push(tile);
        }
      }
    }
    return tiles;
  }
  tunnelPieces() {
    let tunnelPieces = [];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j <= this.grid[i].length; j++) {
        if (this.grid[i][j] === 0 || this.grid[i][j] === 2) {
          let tunnelPiece = new TunnelPiece(
            j * this.blocksize,
            i * this.blocksize,
            this.blocksize,
            this.blocksize,
            [j, i]
          );
          tunnelPieces.push(tunnelPiece);
        }
      }
    }
    return tunnelPieces;
  }

  pellets() {
    let pellets = [];

    for (let i = 0; i < this.grid.length; i += 1) {
      for (let j = 0; j < this.grid[i].length; j += 1) {
        if (this.grid[i][j] === 0) {
          let pellet = new Pellet(
            j * this.blocksize,
            i * this.blocksize,
            this.blocksize,
            this.blocksize
          );
          pellets.push(pellet);
        }
      }
    }
    return pellets;
  }
  draw(ctx) {
    this.drawBackground(ctx);
    this.drawTunnelPieces(ctx);
    this.drawPellets(ctx);

    this.drawTiles(ctx);
  }

  drawBackground(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.width, this.height);
  }

  drawTiles(ctx) {
    this.tiles.forEach(tile => tile.draw(ctx));
  }

  drawTunnelPieces(ctx) {
    this.tunnelPieces.forEach(tunnelPiece => tunnelPiece.draw(ctx));
  }

  drawPellets(ctx) {
    this.pellets.forEach(pellet => pellet.draw(ctx));
  }
}

module.exports = Maze;
