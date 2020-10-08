import IGameObject from "../IGameObject";
import SpriteSheet from "../sprite/SpriteSheet";
import {IDrawIntent} from "../Renderer";
import ObjectPool from "../ObjectPool";

class Brick implements IGameObject {
    public destroyed = false;
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public readonly zIndex = 1;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = 46;
        this.height = 46;
    }

    render(spriteSheet: SpriteSheet, ctx: CanvasRenderingContext2D) {
        const intent: IDrawIntent = {ctx: ctx, height: this.height, width: this.width, x: this.x, y: this.y};
        spriteSheet.brick.brick.draw(intent)
    }

    update(dt: number) {}

    setObjectPool(objectPool: ObjectPool) {
    }

    resolveCollision(objectType: string) {
        if (objectType === 'Bullet') {
            this.destroyed = true;
        }
    }
}

export default Brick
