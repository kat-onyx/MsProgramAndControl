const MovingCritter = require("./movingCritter");

const msPacImg = new Image();
msPacImg.loaded = false;
msPacImg.onload = function () {
  this.loaded = true;
  // console.log(this.loaded)
}
msPacImg.src = "dist/assets/images/MsPac.png";

class MsPac extends MovingCritter {
  constructor(ctx, velX, velY, maze, frameCount) {
    super(velX, velY, maze, frameCount);
    this.ctx = ctx;
    this.width = 44;
    this.radius = 25;
    this.position = [7, 13];
    this.posX = this.position[0] * 44;
    this.posY = this.position[1] * 44;
    this.currentPixelPosX = this.posX;
    this.currentPixelPosY = this.posY;
    this.animFace = "right";
    this.lives = 3;
    this.score = 0;

    this.msPacImg = msPacImg;
  }

  draw(ctx) {
    if (this.posX === this.destinationPosX) {
      this.doneAnimatingX = true;
    }
    if (this.posY === this.destinationPosY) {
      this.doneAnimatingY = true;
    }
    ctx.fillStyle = "red";
    if (this.posX != this.destinationPosX && this.doneAnimatingY === true) {
      this.posX = this.animateMoveX(this.destinationPosX);
      this.posX = Math.floor(this.posX);
    } else if (this.posY != this.destinationPosY && this.doneAnimatingX === true) {
      this.posY = this.animateMoveY(this.destinationPosY);
      this.posY = Math.floor(this.posY)
    }

    this.updateFrameCount();
    this.imgFrameSelect(ctx);
  }


  imgFrameSelect(ctx) {
    if (this.animFace === "right") {
      if (this.frameCount % 15 === 0) {
        return ctx.drawImage(
          this.msPacImg,
          160,
          0,
          160,
          160,
          this.posX - 15,
          this.posY,
          this.width * 1.5,
          this.width * 1.5
        );
      } else {
        return ctx.drawImage(
          this.msPacImg,
          0,
          0,
          160,
          160,
          this.posX - 15,
          this.posY,
          this.width * 1.5,
          this.width * 1.5
        );
      }
    } else if (this.animFace === "left") {
      if (this.frameCount % 15 === 0) {
        return ctx.drawImage(
          this.msPacImg,
          320 + 160,
          0,
          160,
          160,
          this.posX - 10,
          this.posY,
          this.width * 1.5,
          this.width * 1.5
        );
      } else {
        return ctx.drawImage(
          this.msPacImg,
          320,
          0,
          160,
          160,
          this.posX - 10,
          this.posY,
          this.width * 1.5,
          this.width * 1.5
        );
      }
    } else if (this.animFace === "down") {
      if (this.frameCount % 15 === 0) {
        return ctx.drawImage(
          this.msPacImg,
          960 + 160,
          0,
          160,
          160,
          this.posX - 15,
          this.posY - 15,
          this.width * 1.5,
          this.width * 1.5
        );
      } else {
        return ctx.drawImage(
          this.msPacImg,
          960,
          0,
          160,
          160,
          this.posX - 15,
          this.posY - 15,
          this.width * 1.5,
          this.width * 1.5
        );
      }
    } else if (this.animFace === "up") {
      if (this.frameCount % 15 === 0) {
        return ctx.drawImage(
          this.msPacImg,
          640 + 160,
          0,
          160,
          160,
          this.posX - 5,
          this.posY -5,
          this.width * 1.5,
          this.width * 1.5
        );
      } else {
        return ctx.drawImage(
          this.msPacImg,
          640,
          0,
          160,
          160,
          this.posX - 5,
          this.posY -5,
          this.width * 1.5,
          this.width * 1.5
        );
      }
    } else {
      return ctx.drawImage(
        this.msPacImg,
        0,
        0,
        160,
        160,
        this.posX - 21,
        this.posY - 9,
        this.width * 1.5,
        this.width * 1.5
      );
    }
  }
}

module.exports = MsPac;
