import IGameObject from "../../IGameObject";
import SpriteSheet from "../../sprite/SpriteSheet";
import Orientation from "../../Orientation";
import {IDrawIntent} from "../../Renderer";
import ObjectPool from "../../ObjectPool";

class Bullet implements IGameObject {
    public destroyed = false;
    private speed: number;
    private readonly orientation: Orientation;
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public readonly zIndex = 1;

    constructor(x: number, y: number, speed: number, orientation: Orientation) {
        this.speed = speed;
        this.orientation = orientation;
        this.x = x;
        this.y = y;
        if (this.orientation == Orientation.Up || this.orientation === Orientation.Down) {
            this.width = 6;
            this.height = 9;
        } else {
            this.width = 9;
            this.height = 6;
        }
    }

    render(spriteSheet: SpriteSheet, ctx: CanvasRenderingContext2D) {
        const intent: IDrawIntent = {ctx: ctx, height: this.height, width: this.width, x: this.x, y: this.y};
        spriteSheet.bullet[this.orientation].draw(intent)
    }

    update(dt: number) {
        if (this.orientation == Orientation.Up) {
            this.y -= dt * this.speed
        }
        if (this.orientation == Orientation.Down) {
            this.y += dt * this.speed
        }
        if (this.orientation == Orientation.Left) {
            this.x -= dt * this.speed
        }
        if (this.orientation == Orientation.Right) {
            this.x += dt * this.speed
        }
    }

    setObjectPool(objectPool: ObjectPool) {
    }

    resolveCollision(objectType: string) {
        if (objectType.startsWith("wall-") || objectType === 'Tank') {
            this.destroyed = true;
        }
    }
}

export default Bullet
