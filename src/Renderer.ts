import SpriteSheet from "./SpriteSheet";

class Renderer {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly spriteSheet: SpriteSheet;

    constructor(canvas, spriteSheet: SpriteSheet) {
        this.spriteSheet = spriteSheet;
        canvas.height = 680;
        canvas.width = 740;
        this.ctx = canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

    }

    async loaded() {
        await this.spriteSheet.waitToBeReady();
    }

    render(objects) {
        this.drawMapTemplate();
        objects.forEach(obj => {
            obj.render(this.spriteSheet, this.ctx)
        })
    }

    drawMapTemplate() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(20, 20, 640, 640);
    }
}

export default Renderer
