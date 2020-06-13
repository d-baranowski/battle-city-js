import TankController from "../controller/TankController";
import SpriteSheet from "../sprite/SpriteSheet";
import IGameObject from "../IGameObject";

class Tank implements IGameObject {
    public x: number;
    public y: number;
    private readonly level: number;
    private orientation: string;
    private readonly tankController: TankController;
    private stateIndex = 0;
    public destroyed = false;
    speed: number;

    constructor(tankController: TankController, speed: number) {
        this.tankController = tankController;
        this.speed = speed;
        this.orientation = 'up';
        this.level = 0;
        this.x = 140;
        this.y = 50;
    }

    update(dt) {
        if (
            this.tankController.shouldMoveUp() ||
            this.tankController.shouldMoveDown() ||
            this.tankController.shouldMoveRight() ||
            this.tankController.shouldMoveLeft()
        ) {
            this.stateIndex = (this.stateIndex + 1) % 20
        }

        if (this.tankController.shouldMoveUp()) {
            this.orientation = 'up';
            this.y -= this.speed * dt;
        }

        if (this.tankController.shouldMoveDown()) {
            this.orientation = 'down';
            this.y += this.speed * dt;
        }

        if (this.tankController.shouldMoveRight()) {
            this.orientation = 'right';
            this.x += this.speed * dt;
        }
        if (this.tankController.shouldMoveLeft()) {
            this.orientation = 'left';
            this.x -= this.speed * dt;
        }
    }

    render(spriteSheet: SpriteSheet, ctx) {
        spriteSheet.yellowTank[this.level][this.orientation][this.stateIndex > 10 ? "s0" : "s1"].draw({
            x: this.x,
            y: this.y,
            width: 40,
            height: 40,
            ctx: ctx
        })
    }
}

export default Tank
