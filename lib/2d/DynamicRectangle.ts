import Vector from "./Vector";
import Rectangle from "./Rectangle";

class DynamicRectangle extends Rectangle {
    public velocity: Vector;

    constructor(x, y, width, height, vel: Vector) {
        super(x,y, width, height);
        this.velocity = vel
    }

    displace(fElapsedTime: number) {
        this.position = this.position.clone().add(this.velocity.clone().multiplyByScalar(fElapsedTime))
    }

    toString() {
        return `{ position: ${this.position.toString()}, width: ${this.width}, height: ${this.height}, velocity: ${this.velocity.toString()} }`
    }
}

export default DynamicRectangle;
