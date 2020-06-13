import IGameObject from "../../IGameObject";
import SpriteSheet from "../../sprite/SpriteSheet";
import Orientation from "../../Orientation";
import {IDrawIntent} from "../../Renderer";

class Bullet implements IGameObject {
    public destroyed = false;
    private speed: number;
    private readonly orientation: Orientation;
    private x: number;
    private y: number;

    constructor(x: number, y: number, speed: number, orientation: Orientation) {
        this.speed = speed;
        this.orientation = orientation;
        this.x = x;
        this.y = y;
    }

    render(spriteSheet: SpriteSheet, ctx: CanvasRenderingContext2D) {
        let intent: IDrawIntent;
        if (this.orientation == Orientation.Up || this.orientation === Orientation.Down) {
            intent = {ctx: ctx, height: 12, width: 9, x: this.x, y: this.y};
        } else {
            intent = {ctx: ctx, height: 9, width: 12, x: this.x, y: this.y};
        }
        spriteSheet.bullet[this.orientation].draw(intent)
    }

    update(dt: number) {
    }
}

export default Bullet
