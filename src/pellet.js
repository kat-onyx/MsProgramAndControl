

class Pellet {
    constructor(posX, posY, width, height) {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
    }

    draw(ctx) {
   
        // debugger
        ctx.fillStyle = "black";
        ctx.fillRect(this.posX, this.posY, this.width, this.height);

        ctx.fillStyle = "white"
        ctx.beginPath();
        //43 === width/height of each pellet's square
        ctx.arc((this.posX + (43/2)), (this.posY + (43/2)), this.width / 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke()
    }

    findCenter() {
        let centerFromX = this.posX + this.width;
        let centerFromY = this.posY + this.height;
    }
}


module.exports = Pellet;