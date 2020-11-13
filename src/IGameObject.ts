import SpriteSheet from "./sprite/SpriteSheet";
import ObjectPool from "./ObjectPool";
import Orientation from "./Orientation";

interface IGameObject {
    x: number
    y: number
    width: number
    height: number

    destroyed: boolean
    readonly zIndex: number
    update(dt: number)
    render(spriteSheet: SpriteSheet, ctx: CanvasRenderingContext2D)
    setObjectPool(objectPool: ObjectPool)
    resolveCollision(objectType: string, o2?: IGameObject)
    isColliding(objectType: string, o2?: IGameObject): boolean
}

export interface IDynamicGameObject extends IGameObject{
    orientation: Orientation;
    ox: number;
    oy: number;
}

export default IGameObject
