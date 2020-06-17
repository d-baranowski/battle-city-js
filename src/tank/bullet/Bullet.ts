import IGameObject from "../../IGameObject";
import SpriteSheet from "../../sprite/SpriteSheet";
import Orientation from "../../Orientation";
import {IDrawIntent} from "../../Renderer";
import ObjectPool from "../../ObjectPool";

class Bullet implements IGameObject {
    public destroyed = false;
    private speed: number;
    private readonly orientation: Orientation;
    private x: number;
    private y: number;
    public readonly zIndex = 1;
  
    constructor(x: number, y: number, speed: number, orientation: Orientation) {
        this.speed = speed;
        this.orientation = orientation;
        this.x = x;
        this.y = y;
    }

    render(spriteSheet: SpriteSheet, ctx: CanvasRenderingContext2D) {
        let intent: IDrawIntent;
        if (this.orientation == Orientation.Up || this.orientation === Orientation.Down) {
            intent = {ctx: ctx, height: 9, width: 6, x: this.x, y: this.y};
        } else {
            intent = {ctx: ctx, height: 6, width: 9, x: this.x, y: this.y};
        }
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
}

export default Bullet
