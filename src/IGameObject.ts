import SpriteSheet from "./sprite/SpriteSheet";
import ObjectPool from "./ObjectPool";

interface IGameObject {
    destroyed: boolean
    readonly zIndex: number
    update(dt: number)
    render(spriteSheet: SpriteSheet, ctx: CanvasRenderingContext2D)
    setObjectPool(objectPool: ObjectPool) 
}

export default IGameObject
