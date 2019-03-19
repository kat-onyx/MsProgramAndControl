const MsPac = require("./msPac");
const Inky = require("./ghost").inky;
const Pinky = require("./ghost").pinky;
const Clyde = require("./ghost").clyde;
const Blinky = require("./ghost").blinky;
const Maze = require("./maze");

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.keyPressed = [];
    this.startTime = Math.floor(Date.now() / 1000);
    this.maze = new Maze(this.ctx);
    this.msPac = new MsPac(this.ctx, this.maze);
    this.inky = new Inky(this.ctx, this.maze);
    this.pinky = new Pinky(this.ctx, this.maze, this.frameCount);
    this.blinky = new Blinky(this.ctx, this.maze, this.frameCount);
    this.clyde = new Clyde(this.ctx, this.maze, this.frameCount);
    this.ghostHouse = [this.inky, this.blinky, this.pinky, this.clyde];

    this.keyBinds = this.keyBinds.bind(this);
  }

  keyBinds() {
    // debugger
    //keyCodes obtained here: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode#Value_of_keyCode
    document.addEventListener("keydown", e => {
      if ((e.code === "KeyD" || e.code === "ArrowRight") && this.msPac.moveInput.length <= 1) {
        this.keyPressed.unshift(e.code);
        if (this.msPac.moveInput[0] !== "right") {
          this.msPac.moveRight();
        }
        
      }
      if ((e.code === "KeyA" || e.code === "ArrowLeft") && this.msPac.moveInput.length <= 1) {
        this.keyPressed.unshift(e.code);
        if (this.msPac.moveInput[0] !== "left") {
          this.msPac.moveLeft();
        }
      }
      if ((e.code === "KeyW" || e.code === "ArrowUp") && this.msPac.moveInput.length <= 1) {
        this.keyPressed.unshift(e.code);
        if (this.msPac.moveInput[0] !== "up") {
          this.msPac.moveUp();
        }
      }
      if ((e.code === "KeyS" || e.code === "ArrowDown") && this.msPac.moveInput.length <= 1) {
        this.keyPressed.unshift(e.code);
        if (this.msPac.moveInput[0] !== "down") {
          this.msPac.moveDown();
        }
      }
    });
  }

  play() {
    // this.keyBinds();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.ctx.clearRect(0, 0, 870, 750);
    this.step();
    this.detectPelletConsumtption();
    this.detectCritterCollision();
    this.updatePos();
    this.drawUnits();
    
    this.updateGhostBehavior();
    this.updateFrameCount();
    this.drawText();

    if (this.msPac.lives === 0 || this.maze.pellets.length === 0) {
      this.gameOver();
      return;
    }
    requestAnimationFrame(this.animate.bind(this));
  }

  updatePos() {
    this.detectTunnelTravel();
    // this.msPac.newPos(this.maze);
  }

  updateFrameCount() {
    this.frameCount += 1;
  }

  step() {
    // this.msPac.checkDir();
    if (this.msPac.moveInput.length > 0) {
      this.continueMovingCheck();
    }

    this.ghostHouse.forEach(ghost => {
      ghost.checkDir();
    });
  }

  drawUnits() {
    this.maze.draw(this.ctx);
    this.msPac.draw(this.ctx);
    this.inky.draw(this.ctx);
    this.pinky.draw(this.ctx);
    this.blinky.draw(this.ctx);
    this.clyde.draw(this.ctx);
  }

  drawText() {
    this.showLives();
    this.showScore();
  }

  detectPelletConsumtption() {
    this.maze.pellets.forEach((pellet, i) => {
      if (this.isPointInTile(this.msPac, pellet)) {
        this.msPac.score += pellet.point;
        this.maze.pellets.splice(i, 1);
        return;
      }
    });
  }

  detectCritterCollision() {
    this.ghostHouse.forEach(ghost => {
      if (this.isPointInTile(this.msPac, ghost)) {
        console.log("collision");
        this.msPac.lives -= 1;
        this.resetPos();
      }
    });
  }

  updateGhostBehavior() {
    let currentTime = Math.floor(Date.now() / 1000);
    this.ghostHouse.forEach(ghost => {
      if (currentTime - this.startTime >= 30) {
        ghost.chaseMsPac(this.msPac);
      } else if (currentTime - this.startTime >= 20) {
        ghost.randomMovePath();
      }
    });
  }

  resetPos() {
    this.msPac.posX = 308;
    this.msPac.posY = 572;
    this.msPac.destinationPosX = 308,
    this.msPac.destinationPosY = 572;
    this.msPac.currentPixelPosX = 308,
    this.msPac.currentPixelPosY = 572;
    this.msPac.position = [7, 13];
    this.moveInput = [];
  }

  isPointInTile(critter, pellet) {
    let pelletXMin = pellet.posX;
    let pelletXMax = pellet.posX + pellet.width;
    let pelletYMin = pellet.posY;
    let pelletYMax = pellet.posY + pellet.height;

    let critterXMin = critter.posX;
    let critterXMax = critter.posX + critter.width;
    let critterYMin = critter.posY;
    let critterYMax = critter.posY + critter.width;
    return (
      ((critterXMin >= pelletXMin && critterXMin < pelletXMax) ||
        (critterXMax > pelletXMin && critterXMax <= pelletXMax)) &&
      ((critterYMin >= pelletYMin && critterYMin < pelletYMax) ||
        (critterYMax > pelletYMin && critterYMax <= pelletYMax))
    );
  }

  detectTunnelTravel() {
    if ((this.msPac.position[0] === 0 && 
      this.msPac.position[1] === 8) &&
      this.msPac.moveInput[0] === "left") {
        this.msPac.position[0] = 15;
        this.msPac.posX = (16 * 44)
        this.msPac.posY = (8 * 44)
        this.msPac.destinationPosX = (15 * 44)
        this.msPac.destinationPosY = (8 * 44)
        this.msPac.currentPixelPosX = (15 * 44)
        this.msPac.currentPixelPosY = (8 * 44)
      } else if ((this.msPac.position[0] === 15 && 
        this.msPac.position[1] === 8) && 
        this.msPac.moveInput[0] === "right") {
        this.msPac.position[0] = 0;
        this.msPac.posX = 0;
        this.msPac.posY = (8 * 44)
        this.msPac.destinationPosY = (8 * 44)
        this.msPac.destinationPosX = 0;
        this.msPac.currentPixelPosY = (8 * 44)
        this.msPac.currentPixelPosX = (0)
      }
  }

  checkMove(critterPosition, move) {
    // debugger
    let currentXPos = this.msPac.position[0];
    let currentYPos = this.msPac.position[1];

    let nextXPos =
      critterPosition[0] + this.msPac.directions[move][0];
    let nextYPos =
      critterPosition[1] + this.msPac.directions[move][1];

    for(let i = 0; i < this.maze.tunnelPieces.length; i++) {
      if (
        nextXPos === this.maze.tunnelPieces[i].position[0] &&
        nextYPos === this.maze.tunnelPieces[i].position[1]
      ) {
        return [nextXPos, nextYPos];
      }
    }
    return false;
  }

  continueMovingCheck() {
    // debugger
    let currentXPos = this.msPac.position[0];
    let currentYPos = this.msPac.position[1];

    if (this.msPac.doneAnimatingX && this.msPac.doneAnimatingY) {
      if (this.msPac.moveInput[0] && (this.checkMove(this.msPac.position, this.msPac.moveInput[0]))) {
          this.msPac.position = this.checkMove(this.msPac.position, this.msPac.moveInput[0])
          this.msPac.newDestination(currentXPos, currentYPos);
          if (this.msPac.moveInput.length === 2) {
            this.msPac.moveInput.pop();
          }
      } else if (this.msPac.moveInput[1] && (this.checkMove(this.msPac.position, this.msPac.moveInput[1]))) {
          this.msPac.position = this.checkMove(this.msPac.position, this.msPac.moveInput[1])
          this.msPac.newDestination(currentXPos, currentYPos);
      } else {
        this.msPac.newDestination(currentXPos, currentYPos)
        this.msPac.position = [currentXPos, currentYPos]
        this.msPac.moveInput = []
      }
    }
  }

  showScore() {
    this.ctx.fillStyle = "black";
    this.ctx.fillStyle = "red";
    this.ctx.font = "30px Righteous";
    this.ctx.fillText(`Score: `, 730, 415);
    this.ctx.fillText(parseInt(this.msPac.score), 745, 450);
  }

  showLives() {
    this.ctx.fillStyle = "black";
    this.ctx.fillStyle = "red";
    this.ctx.font = "30px Righteous";
    this.ctx.fillText("Lives: ", 730, 300);
    for (let i = 0; i < this.msPac.lives; i++) {
      this.ctx.drawImage(
        this.msPac.msPacImg,
        0,
        0,
        160,
        160,
        710 + i * 40,
        300,
        this.msPac.width * 1.5,
        this.msPac.width * 1.5
      );
    }
  }

  gameOver() {
    if (this.msPac.lives === 0) {
      this.ctx.font = "30px 'Righteous', cursive";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("GAME OVER", 265, 475);
      this.ctx.fillStyle = "black";
    } else {
      this.ctx.font = "30px 'Righteous', cursive";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("YOU WIN! :)", 265, 475);
      this.ctx.fillStyle = "black";
    }
  }
}

module.exports = GameView;
