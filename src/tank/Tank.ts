import TankController from "../controller/TankController";
import SpriteSheet from "../sprite/SpriteSheet";
import IGameObject from "../IGameObject";
import ObjectPool from "../ObjectPool";
import Bullet from "./bullet/Bullet";
import Orientation from "../Orientation";

class Tank implements IGameObject {
    public x: number;
    public y: number;
    private readonly level: number;
    private orientation: Orientation;
    private readonly tankController: TankController;
    private stateIndex = 0;
    public destroyed = false;
    speed: number;
    bulletSpeed: number = 400;
    public readonly zIndex = 0;
    private objectPool: ObjectPool | null = null;
    reload: number = 0;

    constructor(x: number, y: number, tankController: TankController, speed: number) {
        this.tankController = tankController;
        this.speed = speed;
        this.orientation = Orientation.Up;
        this.level = 0;
        this.x = x;
        this.y = y;
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
            this.orientation = Orientation.Up;
            this.y -= this.speed * dt;
        }

        if (this.tankController.shouldMoveDown()) {
            this.orientation = Orientation.Down;
            this.y += this.speed * dt;
        }

        if (this.tankController.shouldMoveRight()) {
            this.orientation = Orientation.Right;
            this.x += this.speed * dt;
        }
        if (this.tankController.shouldMoveLeft()) {
            this.orientation = Orientation.Left;
            this.x -= this.speed * dt;
        }
        if (this.tankController.shouldFire() && this.reload <= 0) {
            
            let xModifier: number = 18
            let yModifier: number = 18
            if (this.orientation == Orientation.Up) {
                yModifier = -10   
            } else if (this.orientation == Orientation.Down) {
                yModifier = 43    
            } else if (this.orientation == Orientation.Left) {
                xModifier = -11    
            } else if (this.orientation == Orientation.Right) {
                xModifier = 43    
            }
            
            let bullet = new Bullet(this.x + xModifier, this.y + yModifier, this.bulletSpeed,this.orientation)
            this.reload = 0.8
            this.objectPool && this.objectPool.addObject(bullet)
            
            
        }
        console.log(this.reload)
        this.reload -= dt
    }

    render(spriteSheet: SpriteSheet, ctx) {
        spriteSheet.yellowTank[this.level][this.orientation][this.stateIndex > 10 ? "s0" : "s1"].draw({
            x: this.x,
            y: this.y,
            width: 42,
            height: 42,
            ctx: ctx
        })
    }

    setObjectPool(objectPool: ObjectPool) {
        this.objectPool = objectPool;
    }
}

export default Tank
