
class Board { 

    width: number;
    height: number;
    padding = {
        left: 100,
        right: 100,
        top: 100,
        bottom: 100 
    }

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height; 
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