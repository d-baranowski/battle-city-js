import Sprite from "../sprite/Sprite";
import SpriteSheet from "../sprite/SpriteSheet";

export interface ITankSpriteSheet {
  left: { s0: Sprite, s1: Sprite }
  right: { s0: Sprite, s1: Sprite }
  up: { s0: Sprite, s1: Sprite }
  down: { s0: Sprite, s1: Sprite }
}

function getTankSpriteSheets(spriteSheet: SpriteSheet, tankType: String): ITankSpriteSheet[] {
  const up_s0 =    new Sprite(spriteSheet, { sourceXOffset:   1, sourceYOffset: 2, sourceWidth: 13, sourceHeight: 13 });
  const up_s1 =    new Sprite(spriteSheet, { sourceXOffset:  17, sourceYOffset: 2, sourceWidth: 13, sourceHeight: 13 });
  const left_s0 =  new Sprite(spriteSheet, { sourceXOffset:  34, sourceYOffset: 1, sourceWidth: 13, sourceHeight: 13 });
  const left_s1 =  new Sprite(spriteSheet, { sourceXOffset:  50, sourceYOffset: 1, sourceWidth: 13, sourceHeight: 13 });
  const down_s0 =  new Sprite(spriteSheet, { sourceXOffset:  65, sourceYOffset: 1, sourceWidth: 13, sourceHeight: 13 });
  const down_s1 =  new Sprite(spriteSheet, { sourceXOffset:  81, sourceYOffset: 1, sourceWidth: 13, sourceHeight: 13 });
  const right_s0 = new Sprite(spriteSheet, { sourceXOffset:  97, sourceYOffset: 1, sourceWidth: 13, sourceHeight: 13 });
  const right_s1 = new Sprite(spriteSheet, { sourceXOffset: 113, sourceYOffset: 1, sourceWidth: 13, sourceHeight: 13 });

  const yellowLevelO = {
    left: { s0: left_s0, s1: left_s1 },
    right: { s0: right_s0, s1: right_s1 },
    up: { s0: up_s0, s1: up_s1 },
    down: { s0: down_s0, s1: down_s1 }
  };

  return [yellowLevelO]

}

export default getTankSpriteSheets
