const canvas = document.getElementById("canvas");

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        canvas.height = 680;
        canvas.width = 740;
        this.ctx = canvas.getContext("2d");
    }

    render() {
        this.ctx.fillStyle = "";
        this.ctx.fillRect(20, 20, 640, 640);
    }
}


const renderer = new Renderer(canvas);
renderer.render();
