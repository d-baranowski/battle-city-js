import IGameObject from "../IGameObject";
import SpriteSheet from "../sprite/SpriteSheet";
import {IDrawIntent} from "../Renderer";
import ObjectPool from "../ObjectPool";
import Collider from "../Collider";

interface IElement {
    x: number,
    y: number,
    width: number,
    height: number,
    destroyed: boolean
}

const ELEMENT_WIDTH = 12;
const ELEMENT_HEIGHT = 12;
export const BRICK_DIMENSION = 48;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class Brick implements IGameObject {
    public destroyed = false;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    private readonly elements: IElement[];

    public readonly zIndex = 2;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = BRICK_DIMENSION;
        this.height = BRICK_DIMENSION;
        this.elements = [];

        let index = 0;
        for (let i=0; i < 4; i++) {
            for  (let j=0; j < 4; j++) {
                this.elements[index] = {
                    x: this.x + i * 12,
                    y: this.y + j * 12,
                    width: ELEMENT_WIDTH,
                    height: ELEMENT_HEIGHT,
                    destroyed: false
                };
                index = index + 1
            }
        }
        this.elements[getRandomInt(16)].destroyed = true;
        this.elements[getRandomInt(16)].destroyed = true
    }

    render(spriteSheet: SpriteSheet, ctx: CanvasRenderingContext2D) {
        const intent: IDrawIntent = {ctx: ctx, height: this.height, width: this.width, x: this.x, y: this.y};
        spriteSheet.brick.brick.draw(intent);

        this.elements.forEach((element) =>{
            if (element.destroyed) {
                ctx.fillStyle = '#000000';
                ctx.fillRect(element.x, element.y, ELEMENT_WIDTH, ELEMENT_HEIGHT)
            }
        })
    }

    update(dt: number) {
    }

    setObjectPool(objectPool: ObjectPool) {
    }

    isColliding(objectType: string, o2: IGameObject) {
        for (const e of this.elements) {
            if (!e.destroyed && Collider.overlaps(e, o2)) {
                return true
            }
        }
        return false
    }

    resolveCollision(objectType: string, o2: IGameObject) {
        if (objectType === 'Bullet') {
            for (const e of this.elements) {
                if (!e.destroyed && Collider.overlaps(e, o2)) {
                    e.destroyed = true;
                }
            }
            if (this.elements.filter((e) => !e.destroyed).length == 0) {
                this.destroyed = true
            }
        }
    }
}

export default Brick
