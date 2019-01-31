const MovingCritter = require("./movingCritter");

const msPacImg = new Image();
msPacImg.src = "./MsPac.png";

class MsPac extends MovingCritter {
  constructor(ctx, velX, velY, maze, frameCount) {
    super(velX, velY, maze, frameCount);
    this.ctx = ctx;
    this.width = 43;
    this.radius = 25;
    this.position = [7, 13];
    this.posX = this.position[0] * 43;
    this.posY = this.position[1] * 43;
    this.lives = 3;
    this.score = 0;

    this.msPacImg = msPacImg;
  }

  draw(ctx) {
    // debugger

    ctx.fillStyle = "red";
    ctx.fillRect(this.posX, this.posY, this.width, this.width);
    // this.updateFrameCount();
    // this.imgFrameSelect(ctx);
  }


  imgFrameSelect(ctx) {
    if (this.velX > 0) {
      if (this.frameCount % 15 === 0) {
        return ctx.drawImage(
          this.msPacImg,
          160,
          0,
          160,
          160,
          this.posX - 21,
          this.posY - 9,
          this.width * 2,
          this.width * 2
        );
      } else {
        return ctx.drawImage(
          this.msPacImg,
          0,
          0,
          160,
          160,
          this.posX - 21,
          this.posY - 9,
          this.width * 2,
          this.width * 2
        );
      }
    } else if (this.velX < 0) {
      if (this.frameCount % 15 === 0) {
        return ctx.drawImage(
          this.msPacImg,
          320 + 160,
          0,
          160,
          160,
          this.posX - 15,
          this.posY - 9,
          this.width * 2,
          this.width * 2
        );
      } else {
        return ctx.drawImage(
          this.msPacImg,
          320,
          0,
          160,
          160,
          this.posX - 15,
          this.posY - 9,
          this.width * 2,
          this.width * 2
        );
      }
    } else if (this.velY > 0) {
      if (this.frameCount % 15 === 0) {
        return ctx.drawImage(
          this.msPacImg,
          960 + 160,
          0,
          160,
          160,
          this.posX - 30,
          this.posY - 9 - 12.5,
          this.width * 2,
          this.width * 2
        );
      } else {
        return ctx.drawImage(
          this.msPacImg,
          960,
          0,
          160,
          160,
          this.posX - 30,
          this.posY - 9 - 12.5,
          this.width * 2,
          this.width * 2
        );
      }
    } else if (this.velY < 0) {
      if (this.frameCount % 15 === 0) {
        return ctx.drawImage(
          this.msPacImg,
          640 + 160,
          0,
          160,
          160,
          this.posX - 10,
          this.posY - 9 - 5,
          this.width * 2,
          this.width * 2
        );
      } else {
        return ctx.drawImage(
          this.msPacImg,
          640,
          0,
          160,
          160,
          this.posX - 10,
          this.posY - 9 - 5,
          this.width * 2,
          this.width * 2
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
        this.width * 2,
        this.width * 2
      );
    }
  }
}

module.exports = MsPac;
