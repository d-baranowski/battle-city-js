import Sprite from "../sprite/Sprite";
import SpriteSheet from "../sprite/SpriteSheet";

export interface IBrickSpriteSheet {
    brick: Sprite
}

export function getBrickSpriteSheet(spriteSheet: SpriteSheet): IBrickSpriteSheet {
    return {
        brick: new Sprite(spriteSheet, {sourceXOffset: 256, sourceYOffset: 0, sourceWidth: 16, sourceHeight: 16}),
    }
}

