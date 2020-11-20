import Vector from "./Vector";

class Rectangle {
    // Top left corner of the rectangle
    public position: Vector;
    public width: number;
    public height: number;

    constructor(x, y, width, height) {
        this.position = new Vector(x, y);
        this.width = width;
        this.height = height
    }

    toString() {
        return `{ position: ${this.position.toString()}, width: ${this.width}, height: ${this.height} }`
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    center() {
        const halfSize = new Vector(this.width, this.height).divideByScalar(2);
        return this.position.clone().add(halfSize)
    }
}

export default Rectangle;
