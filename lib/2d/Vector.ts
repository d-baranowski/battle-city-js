import Point from "./Point";

class Vector extends Point {
    /**
     * Return an Array containing the vector axes, e.g [0, 4]
     */
    toArray() {
        return [this.x, this.y]
    }

    /**
     * Return an Object containing the vector axes, e.g { x: 0, y: 4 }
     */
    toObject() {
        return {
            x: this.x,
            y: this.y
        }
    }

    /**
     * Add the provided vector to this one
     */
    add(vec: Vector) {
        this.x += vec.x;
        this.y += vec.y;

        return this
    }

    /**
     * Subtract the provided vector from this one
     */
    subtract(vec: Vector) {
        this.x -= vec.x;
        this.y -= vec.y;

        return this
    }

    /**
     * Check if the provided vector equal to this one
     */
    equals(vec: Vector) {
        return vec.x === this.x && vec.y === this.y
    }

    /**
     * Multiply this vector by the provided vector
     */
    multiplyByVector(vec: Vector) {
        this.x *= vec.x;
        this.y *= vec.y;

        return this
    }

    /**
     * Multiply this vector by the provided vector
     */
    mulV(vec: Vector) {
        return this.multiplyByVector(vec)
    }

    /**
     * Divide this vector by the provided vector
     */
    divideByVector(vec: Vector) {
        this.x /= vec.x;
        this.y /= vec.y;
        return this
    }

    /**
     * Divide this vector by the provided vector
     */
    divV(v: Vector) {
        return this.divideByVector(v)
    }

    /**
     * Multiply this vector by the provided number
     */
    multiplyByScalar(n: number) {
        this.x *= n;
        this.y *= n;

        return this
    }

    /**
     * Multiply this vector by the provided number
     */
    mulS(n: number) {
        return this.multiplyByScalar(n)
    }

    /**
     * Divive this vector by the provided number
     */
    divideByScalar(n: number) {
        this.x /= n;
        this.y /= n;
        return this
    }

    /**
     * Divive this vector by the provided number
     */
    divS(n: number) {
        return this.divideByScalar(n)
    }

    /**
     * Normalise this vector
     */
    normalise() {
        return this.divideByScalar(this.magnitude())
    }

    /**
     * For American spelling. Same as unit/normalise function
     */
    normalize() {
        return this.normalise()
    }

    /**
     * The same as normalise and normalize
     */
    unit() {
        return this.normalise()
    }

    /**
     * Returns the magnitude (length) of this vector
     */
    magnitude() {
        const x = this.x;
        const y = this.y;

        return Math.sqrt(x * x + y * y)
    }

    /**
     * Returns the magnitude (length) of this vector
     */
    length() {
        return this.magnitude()
    }

    /**
     * Returns the squred length of this vector
     */
    lengthSq() {
        const x = this.x;
        const y = this.y;

        return x * x + y * y
    }

    /**
     * Returns the dot product of this vector by another
     */
    dot(vec: Vector) {
        return vec.x * this.x + vec.y * this.y
    }

    /**
     * Returns the cross product of this vector by another.
     */
    cross(vec: Vector) {
        return this.x * vec.y - this.y * vec.x
    }

    /**
     * Reverses this vector i.e multiplies it by -1
     */
    reverse() {
        this.x = -this.x;
        this.y = -this.y;
        return this
    }

    /**
     * Set the vector axes values to absolute values
     */
    abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);

        return this
    }

    /**
     * Zeroes the vector i.e sets all axes to 0
     */
    zero() {
        this.x = this.y = 0;

        return this
    }

    /**
     * Returns the distance between this vector and another
     */
    distance(v: Vector) {
        var x = this.x - v.x;
        var y = this.y - v.y;

        return Math.sqrt(x * x + y * y)
    }

    /**
     * Rotates the vetor by provided radians
     */
    rotate(rads: number) {
        const cos = Math.cos(rads);
        const sin = Math.sin(rads);

        const ox = this.x;
        const oy = this.y;

        this.x = ox * cos - oy * sin;
        this.y = ox * sin + oy * cos;

        return this
    }

    /**
     * Returns a copy of this vector
     */
    clone() {
        return new Vector(this.x, this.y)
    }
}

export default Vector
