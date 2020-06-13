import SpriteSheet from "./SpriteSheet";
import { IDrawIntent } from "../Renderer";


interface IProps {
  sourceXOffset: number,
  sourceYOffset: number,
  sourceWidth: number,
  sourceHeight: number
}

class Sprite {
  spriteSheet: SpriteSheet;

  sourceXOffset: number;
  sourceYOffset: number;
  sourceWidth: number;
  sourceHeight: number;

  constructor(spriteSheet: SpriteSheet, props: IProps) {
    this.spriteSheet = spriteSheet;
    this.sourceXOffset = props.sourceXOffset;
    this.sourceYOffset = props.sourceYOffset;
    this.sourceWidth = props.sourceWidth;
    this.sourceHeight = props.sourceHeight
  }

  draw(props: IDrawIntent) {
    props.ctx.drawImage(this.spriteSheet.getImage(),
      this.sourceXOffset,
      this.sourceYOffset,
      this.sourceWidth,
      this.sourceHeight,
      props.x,
      props.y,
      props.width,
      props.height
    )
  }
}

export default Sprite

