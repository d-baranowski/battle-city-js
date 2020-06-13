import SpriteSheet from "./sprite/SpriteSheet";

interface IGameObject {
    destroyed: boolean
    update(dt: number)
    render(spriteSheet: SpriteSheet, ctx: CanvasRenderingContext2D)
}

export default IGameObject
