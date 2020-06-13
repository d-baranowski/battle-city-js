import Sprite from "../../sprite/Sprite";
import SpriteSheet from "../../sprite/SpriteSheet";

export interface IBulletSpriteSheet {
    left: Sprite
    right: Sprite
    up: Sprite
    down: Sprite
}

export function getBulletSpriteSheet(spriteSheet: SpriteSheet): IBulletSpriteSheet {
    return {
        up: new Sprite(spriteSheet, {sourceXOffset: 323, sourceYOffset: 102, sourceWidth: 3, sourceHeight: 4}),
        left: new Sprite(spriteSheet, {sourceXOffset: 330, sourceYOffset: 102, sourceWidth: 4, sourceHeight: 3}),
        down: new Sprite(spriteSheet, {sourceXOffset: 339, sourceYOffset: 102, sourceWidth: 3, sourceHeight: 4}),
        right: new Sprite(spriteSheet, {sourceXOffset: 346, sourceYOffset: 102, sourceWidth: 4, sourceHeight: 3}),
    }
}

