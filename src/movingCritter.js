class MovingCritter {
  constructor(maze) {
    this.frameCount = 0;
    this.maze = maze;
    this.velX = 0;
    this.velY = 0;
    this.posX = 0;
    this.posY = 0;
    this.collisionDetected = false;
    this.collisionDetectedGhost = false;
    this.moveInput = [];
    this.detectWallCollision = this.detectWallCollision.bind(this);

    this.directions = {
      up: [0, -1],
      down: [0, 1],
      left: [-1, 0],
      right: [1, 0]
    };
  }

  checkDir() {
    // debugger
    this.detectWallCollision();
    if (this.collisionDetected === true) {
      this.collisionDetectedGhost = true;
      this.moveStop();
    }
    this.collisionDetected = false;
  }
  detectWallCollision() {
    // debugger
    this.maze.tiles.forEach(tile => {
      if (this.isPointInTile(tile)) {
        this.collisionDetected = true;
      }
    });
  }

  // checkMove(critterPosition) {
  //     debugger
  //     let nextXPos = critterPosition[0] + this.directions[this.moveInput[0][0]];
  //     let nextYPos = critterPosition[1] + this.directions[this.moveInput[0][1]];

  //     this.maze.tunnelPieces.forEach(tunnelPiece => {
  //         if ([nextXPos, nextYPos] === tunnelPiece.position) {
  //             critterPosition = [nextXPos, nextYPos];
  //         }
  //         this.moveInput.shift();
  //     })
  // }

  isPointInTile(tile) {
    let tileXMin = tile.xPos;
    let tileXMax = tile.xPos + tile.width;
    let tileYMin = tile.yPos;
    let tileYMax = tile.yPos + tile.height;

    let critterXMin = this.posX;
    let critterXMax = this.posX + this.width;
    let critterYMin = this.posY;
    let critterYMax = this.posY + this.width;
    // console.log(critterXMax, critterXMin)
    return (
      ((critterXMin >= tileXMin && critterXMin < tileXMax) ||
        (critterXMax > tileXMin && critterXMax <= tileXMax)) &&
      ((critterYMin >= tileYMin && critterYMin < tileYMax) ||
        (critterYMax > tileYMin && critterYMax <= tileYMax))
    );
  }

  updateFrameCount() {
    this.frameCount += 1;
    this.frameCount = this.frameCount % 60;
  }

  newPos(maze, prevXpos, prevYpos) {
    // debugger
    if (prevXpos != this.position[0]) {
      this.posX = this.position[0] * 43;
    } else if (prevYpos != this.position[1]) {
      this.posY = this.position[1] * 43;
    }
    // this.posX += this.velX;
    // this.posY += this.velY;
  }

  moveLeft() {
    this.moveInput.push("left");
    // this.velY = 0;
    // this.velX = this.velX - 2;
  }

  moveRight() {
    this.moveInput.push("right");
    // this.velY = 0;
    // this.velX = this.velX + 2;
  }

  moveUp() {
    this.moveInput.push("up");
    // this.velX = 0;
    // this.velY = this.velY - 2;
  }

  moveDown() {
    this.moveInput.push("down");
    // this.velX = 0;
    // this.velY = this.velY + 2;
  }

  moveStop() {
    // this.posX -= this.velX;
    // this.posY -= this.velY;
    // this.velX = 0;
    // this.velY = 0;
  }
}

module.exports = MovingCritter;
