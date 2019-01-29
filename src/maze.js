const Tile = require("./tile");
const Pellet = require("./pellet");
const TunnelPiece = require("./tunnelPiece");

class Maze {
  constructor(ctx) {
    this.radius = 10;
    this.ctx = ctx;
    this.width = 700;
    this.height = 770;
    // debugger
    // bitmap for the grid
    (this.grid = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 4, 4, 1, 1, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 6, 6, 7, 6, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 1, 6, 6, 6, 6, 1, 0, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 2, 2, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]),
      (this.blocksize = Math.floor(this.width / this.grid[0].length));
    this.tiles = this.tiles();
    this.tunnelPieces = this.tunnelPieces();
    this.pellets = this.pellets();
  }

  tiles() {
    // debugger
    let tiles = [];
    let tunnelPieces = [];
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
        } else if (this.grid[i][j] === 0) {
          let tunnelPiece = new TunnelPiece(
            j * this.blocksize,
            i * this.blocksize,
            this.blocksize,
            this.blocksize
          );
          tunnelPieces.push(tunnelPiece);
        }
      }
    }
    return tiles;
  }
  tunnelPieces() {
    // debugger
    let tunnelPieces = [];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
       if (this.grid[i][j] === 0) {
          let tunnelPiece = new TunnelPiece(
            j * this.blocksize,
            i * this.blocksize,
            this.blocksize,
            this.blocksize,
            [i, j]
          );
          tunnelPieces.push(tunnelPiece);
        }
      }
    }
    return tunnelPieces;
  }

  pellets() {
    // debugger
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
    this.drawTiles(ctx);
    this.drawTunnelPieces(ctx);
    this.drawPellets(ctx);
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
      this.tunnelPieces.forEach(tunnelPiece => tunnelPiece.draw(ctx))
  }

  drawPellets(ctx) {
    // debugger
    this.pellets.forEach(pellet => pellet.draw(ctx));
  }
}

module.exports = Maze;
