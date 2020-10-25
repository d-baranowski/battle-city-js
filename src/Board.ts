import {BRICK_DIMENSION} from "./brick/Brick";

class Board {
    width: number;
    height: number;
    padding = {
        left: 30,
        right: 60,
        top: 30,
        bottom: 30
    };
    public readonly gridWidth: number;
    public readonly gridHeight: number;

    constructor(gridWidth: number, gridHeight: number) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.width = gridWidth * BRICK_DIMENSION;
        this.height = gridHeight * BRICK_DIMENSION;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "#848284";
        ctx.fillRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
        ctx.fillStyle = "black";
        ctx.fillRect(this.padding.left, this.padding.top, this.width, this.height);
    }

    getCanvasWidth(): number {
        return this.padding.left + this.width + this.padding.right
    }

    getCanvasHeight(): number {
        return this.padding.top + this.height + this.padding.bottom
    }
  }

export default Board
