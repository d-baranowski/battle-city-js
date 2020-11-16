import Vector from "./Vector";
import Point from "./Point";

// https://youtu.be/8JJ-4JgR7Dg?t=1006
class Ray {
    public start: Vector;
    public direction: Vector;

    constructor(start: Vector, direction: Vector) {
        this.start = start;
        this.direction = direction;
    }

    getPointAlongRay(t: number): Point {
        return this.start.clone().add(this.direction.clone().multiplyByScalar(t))
    }

    clone() {
        return new Ray(this.start.clone(), this.direction.clone())
    }
}

export default Ray
