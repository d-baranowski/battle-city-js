import SpriteSheet from "./sprite/SpriteSheet";
import ObjectPool from "./ObjectPool";

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
    resolveCollision(objectType: string)
}

export default IGameObject
