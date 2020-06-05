import TankController from "./TankController";

class Tank {
    public x: number;
    public y: number;
    private readonly tankController: TankController;
    speed: number;

    constructor(tankController: TankController, speed: number) {
        this.tankController = tankController
        this.speed = speed
        
        this.x = 140;
        this.y = 50;
    }

    update(dt) {
        if (this.tankController.shouldMoveUp()) {
            this.y-= this.speed * dt;
        }
        
        if (this.tankController.shouldMoveDown()) {
            this.y+= this.speed * dt;
        }
        
        if (this.tankController.shouldMoveRight()) {
            this.x+= this.speed * dt;
        }
        if (this.tankController.shouldMoveLeft()) {
            this.x-= this.speed * dt;
        }
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
