const canvas = document.getElementById("canvas");

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        canvas.height = 680;
        canvas.width = 740;
        this.ctx = canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled= false;
        this.spriteSheet = new Image();
        this.spriteSheet.src = "sprites.png";
    }

    render() {
        this.drawMapTemplate();
        this.drawTank();
    }

    drawMapTemplate() {
        this.ctx.fillStyle = "";
        this.ctx.fillRect(20, 20, 640, 640);
    }

    drawTank() {
        this.spriteSheet.onload = () => {
            this.ctx.drawImage(this.spriteSheet,
                1,
                3,
                13,
                12,
                50,
                50,
                40,
                40);
        }
    }
}


const renderer = new Renderer(canvas);
renderer.render();


