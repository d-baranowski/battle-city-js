import getTankSpriteSheets, { ITankSpriteSheet } from "../tank/TankSpriteSheet";
import {getBulletSpriteSheet, IBulletSpriteSheet} from "../tank/bullet/BulletSpriteSheet";

const sleep = async function (msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
};

class SpriteSheet {
    private ready: boolean = false;
    private readonly image: HTMLImageElement;
    public yellowTank: ITankSpriteSheet[];
    public bullet: IBulletSpriteSheet;

    constructor() {
        this.ready = false;
        this.image = new Image();
        this.image.onload = () => {
            this.ready = true;
        };
        this.image.src = "public/sprites.png";
        this.yellowTank = getTankSpriteSheets(this, 'yellow');
        this.bullet = getBulletSpriteSheet(this)
    }

    async waitToBeReady(count = 0): Promise<boolean> {
        if (this.ready) {
            return Promise.resolve(true);
        }


        if (count < 20) {
            await sleep(100);
            return this.waitToBeReady(count + 1)
        }

        return Promise.resolve(false)
    }

    getImage() {
        return this.image;
    }
}

export default SpriteSheet
