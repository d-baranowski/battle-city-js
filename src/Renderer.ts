import SpriteSheet from "./sprite/SpriteSheet";
import Board from "./Board";



export interface IDrawIntent {
    x: number
    y: number
    width: number
    height: number
    ctx: CanvasRenderingContext2D
}
class Renderer {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly spriteSheet: SpriteSheet;
    private readonly board: Board;

    constructor(canvas, spriteSheet: SpriteSheet, board: Board) {
        this.board = board;
        this.spriteSheet = spriteSheet;
        canvas.height = board.getCanvasHeight();
        canvas.width = board.getCanvasWidth();
        this.ctx = canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

    }

    async loaded() {
        await this.spriteSheet.waitToBeReady();
    }

    render(objects) {
        this.board.draw(this.ctx)
        objects.forEach(obj => {
            obj.render(this.spriteSheet, this.ctx)
        })
    }
}

export default Renderer
