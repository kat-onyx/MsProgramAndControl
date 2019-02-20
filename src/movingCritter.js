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
    this.destinationPosX = 7 * 44;
    this.destinationPosY = 13 * 44;
    this.doneAnimatingX = true;
    this.doneAnimatingY = true;
    this.detectWallCollision = this.detectWallCollision.bind(this);

    this.directions = {
      up: [0, -1],
      down: [0, 1],
      left: [-1, 0],
      right: [1, 0]
    };
  }

  checkDir() {
    this.detectWallCollision();
    if (this.collisionDetected === true) {
      this.collisionDetectedGhost = true;
    }
    this.collisionDetected = false;
  }
  detectWallCollision() {
    this.maze.tiles.forEach(tile => {
      if (this.isPointInTile(tile)) {
        this.collisionDetected = true;
      }
    });
  }

  isPointInTile(tile) {
    let tileXMin = tile.xPos;
    let tileXMax = tile.xPos + tile.width;
    let tileYMin = tile.yPos;
    let tileYMax = tile.yPos + tile.height;

    let critterXMin = this.posX;
    let critterXMax = this.posX + this.width;
    let critterYMin = this.posY;
    let critterYMax = this.posY + this.width;

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

  animateMoveX(destinationPos) {
    if (this.currentPixelPosX > destinationPos) {
      this.animFace = "left";
      this.doneAnimatingX = false;
      return (this.currentPixelPosX -= 4)
    } else if (this.currentPixelPosX < destinationPos) {
      this.animFace = "right";
      this.doneAnimatingX = false;
      return (this.currentPixelPosX += 4)
    } else if (this.currentPixelPosX === destinationPos) {
      this.doneAnimatingX = true;
      return destinationPos;
    }
  }

  animateMoveY(destinationPos) {
    if (this.currentPixelPosY > destinationPos) {
      this.animFace = "up";
      this.doneAnimatingY = false;
      return (this.currentPixelPosY -= 4)
    } else if (this.currentPixelPosY < destinationPos) {
      this.animFace = "down"
      this.doneAnimatingY = false;
      return (this.currentPixelPosY += 4)
    } else if (this.currentPixelPosY === destinationPos) {
      this.doneAnimatingY = true;
      return destinationPos;
    }
  }

  newDestination(prevXpos, prevYpos) {
    if (prevXpos != this.position[0]) {
      this.destinationPosX = this.position[0] * 44;
    } else if (prevYpos != this.position[1]) {
      this.destinationPosY = this.position[1] * 44;
    }
  }

  moveLeft() {
    this.moveInput.unshift("left");
  }

  moveRight() {
    this.moveInput.unshift("right");
  }

  moveUp() {
    this.moveInput.unshift("up");
  }

  moveDown() {
    this.moveInput.unshift("down");
  }
}

module.exports = MovingCritter;
