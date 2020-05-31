const sleep = async function (msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
};

class SpriteSheet {
    private ready: boolean = false;
    private readonly image: HTMLImageElement;

    constructor() {
        this.ready = false;
        this.image = new Image();
        this.image.onload = () => {
            this.ready = true;
        };

        this.image.src = "public/sprites.png";
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
