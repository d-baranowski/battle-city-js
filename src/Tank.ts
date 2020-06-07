import TankController from "./TankController";
import SpriteSheet from "./SpriteSheet";

class Tank {
    public x: number;
    public y: number;
    private level: number;
    private orientation: string;
    private readonly tankController: TankController;
    speed: number;

    constructor(tankController: TankController, speed: number) {
        this.tankController = tankController
        this.speed = speed
        this.orientation = 'up'
        this.level = 0
        this.x = 140;
        this.y = 50;
    }

    update(dt) {
        if (this.tankController.shouldMoveUp()) {
            this.orientation = 'up'
            this.y -= this.speed * dt;
        }

        if (this.tankController.shouldMoveDown()) {
            this.orientation = 'down'
            this.y += this.speed * dt;
        }

        if (this.tankController.shouldMoveRight()) {
            this.orientation = 'right'
            this.x += this.speed * dt;
        }
        if (this.tankController.shouldMoveLeft()) {
            this.orientation = 'left'
            this.x -= this.speed * dt;
        }
    }

    render(spriteSheet: SpriteSheet, ctx) {
        spriteSheet.yellowTank[this.level][this.orientation].s0.draw({
            x: this.x,
            y: this.y,
            width: 40,
            height: 40,
            ctx: ctx
        })
    }
}

export default Tank
