

class Pellet {
    constructor(posX, posY, width, height) {
        this.width = width;
        this.height = height;
        // this.point = 100;
        this.posX = posX;
        this.posY = posY;

    }

    draw(ctx) {
   
        // debugger
        ctx.fillStyle = "black";
        ctx.fillRect(this.posX, this.posY, this.width, this.height);

        ctx.fillStyle = "white"
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.width / 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke()
    }

    findCenter() {
        let centerFromX = this.posX + this.width;
        let centerFromY = this.posY + this.height;
    }
}


module.exports = Pellet;