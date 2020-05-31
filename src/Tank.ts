class Tank {
    readonly x: number;
    readonly y: number;

    constructor() {
        this.x = 140;
        this.y = 50;
    }

    render(spriteSheet, ctx) {
        ctx.drawImage(spriteSheet.getImage(),
            1,
            3,
            13,
            12,
            this.x,
            this.y,
            40,
            40);
    }
}

export default Tank
