class MovingCritter {
    constructor(maze) {
        // debugger
        this.maze = maze;
        this.velX = 0;
        this.velY = 0;
        this.posX = 0;
        this.posY = 0;
        this.collisionDetected = false;
        this.collisionDetectedGhost = false;
        // this.collisionDetectedmsPac = false;
        this.detectWallCollision = this.detectWallCollision.bind(this);
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
        this.maze.tiles.forEach((tile) => {
            if (this.isPointInTile(tile)) {
                this.collisionDetected = true;
            }
        })
    }

    isPointInTile(tile) {
        let tileXMin = tile.xPos;
        let tileXMax = tile.xPos + tile.width;;
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
        )
    }
    moveLeft() {
        this.velY = 0;
        this.velX = this.velX - 3;
    }

    moveRight() {
        this.velY = 0;
        this.velX = this.velX + 3;
    }

    moveUp() {
        this.velX = 0;
        this.velY = this.velY - 3;
    }

    moveDown() {
        this.velX = 0;
        this.velY = this.velY + 3;
    }

    moveStop() {
        this.posX -= this.velX;
        this.posY -= this.velY;
        this.velX = 0;
        this.velY = 0;
    }
}

module.exports = MovingCritter;