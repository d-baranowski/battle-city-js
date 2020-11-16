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
}

export default Rectangle;
