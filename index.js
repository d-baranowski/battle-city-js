const canvas = document.getElementById("canvas");

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        canvas.height = 680;
        canvas.width = 740;
        this.ctx = canvas.getContext("2d");
        this.spriteSheet = new Image();
        this.spriteSheet.src = "sprites.png";
        this.spriteWidth  = 400;
        this.spriteHeight = 256;
    }

    render() {
        this.ctx.fillStyle = "";
        this.ctx.fillRect(20, 20, 640, 640);
        this.drawTank();
        
    }

    drawTank() {
        this.ctx.drawImage(this.spriteSheet,
                          20,
                          20,
                          20,
                          20,
                          20,
                          20,
                          this.spriteWidth,
                          this.spriteHeight);
    }
  
}




const renderer = new Renderer(canvas);
renderer.render();


