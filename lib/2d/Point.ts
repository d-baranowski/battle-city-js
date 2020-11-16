class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `{ x: ${this.x}, y: ${this.y} }`
    }
}

export default Point;
