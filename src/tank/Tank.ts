import TankController from "../controller/TankController";
import SpriteSheet from "../sprite/SpriteSheet";
import IGameObject from "../IGameObject";
import ObjectPool from "../ObjectPool";
import Bullet from "./bullet/Bullet";
import Orientation from "../Orientation";
import Collider from "../Collider";
import Brick from "../brick/Brick";

const TANK_LEVEL_INFO = [
    { width: 42, height: 42, initialSpeed: 150 }
];

class Tank implements IGameObject {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    private lives: number;
    private readonly level: number;
    private orientation: Orientation;
    private tankController: TankController | undefined;
    private stateIndex = 0;
    public readonly stuck = {
        up: false,
        down: false,
        left: false,
        right: false
    };
    public destroyed = false;
    speed: number;
    bulletSpeed: number = 400;
    public readonly zIndex = 0;
    private objectPool: ObjectPool | null = null;
    reload: number = 0;

    constructor(x: number, y: number, level: number, lives: number = 4) {
        this.speed = TANK_LEVEL_INFO[level].initialSpeed;
        this.orientation = Orientation.Up;
        this.level = level;
        this.x = x;
        this.y = y;
        this.width = TANK_LEVEL_INFO[level].width;
        this.height = TANK_LEVEL_INFO[level].height;
        this.lives = lives;
    }

    setController(tankController: TankController) {
        this.tankController = tankController;
    }

    isColliding() {
        return true;
    }

    resolveCollision(objectType: string, o2) {
        this.tankController && this.tankController.onCollision(objectType, o2);

        if (objectType == "wall-left") {
            this.stuck.left = true
        }
        if (objectType == "wall-right") {
            this.stuck.right = true
        }
        if (objectType == "wall-up") {
            this.stuck.up = true
        }
        if (objectType == "wall-down") {
            this.stuck.down = true
        }
        // if (objectType == "Bullet") {
        //     this.lives--;
        //     if (this.lives < 1) {
        //         this.destroyed = true;
        //     }
        // }
        if (objectType == "Brick") {
            o2.elements.filter(e => !e.destroyed).forEach((o2 => {
               if (Collider.overlaps(this, o2)) {
                   if ( this.orientation === Orientation.Left && o2.y - this.height < this.y && this.y < o2.y + o2.height && this.x < o2.x + o2.width ) {
                       this.x = o2.x + o2.width
                   }
                   else if ( this.orientation === Orientation.Right && o2.y - this.height < this.y && this.y < o2.y + o2.height && this.x > o2.x - this.width ) {
                       this.x = o2.x - this.width
                   }
                   else if ( this.orientation === Orientation.Down && this.y > (o2.y - this.height) && this.x < o2.x + o2.width && this.x > o2.x - this.width) {
                       this.y = o2.y - this.height
                   }
                   else if ( this.orientation === Orientation.Up && this.y < (o2.y + o2.height) && this.x < o2.x + o2.width && this.x > o2.x - this.width) {
                       this.y = o2.y + o2.height
                   }
               }
            }))
        }
    }

    update(dt) {
        if (
            this.tankController &&
            (this.tankController.shouldMoveUp() ||
            this.tankController.shouldMoveDown() ||
            this.tankController.shouldMoveRight() ||
            this.tankController.shouldMoveLeft())
        ) {
            this.stateIndex = (this.stateIndex + 1) % 20
        }

        if (this.tankController && this.tankController.shouldMoveUp()) {
            this.orientation = Orientation.Up;
            this.y = this.stuck.up ? this.y -= 0 : this.y -= this.speed * dt;
        }

        if (this.tankController && this.tankController.shouldMoveDown()) {
            this.orientation = Orientation.Down;
            this.y = this.stuck.down ? this.y -= 0 : this.y += this.speed * dt;
        }

        if (this.tankController && this.tankController.shouldMoveRight()) {
            this.orientation = Orientation.Right;
            this.x = this.stuck.right ? this.x -= 0 : this.x += this.speed * dt;
        }
        if (this.tankController && this.tankController.shouldMoveLeft()) {
            this.orientation = Orientation.Left;
            this.x = this.stuck.left ? this.x -= 0 : this.x -= this.speed * dt;
        }
        if (this.tankController && this.tankController.shouldFire() && this.reload <= 0) {
            let xModifier: number = 18;
            let yModifier: number = 18;
            if (this.orientation == Orientation.Up) {
                yModifier = -10
            } else if (this.orientation == Orientation.Down) {
                yModifier = 43
            } else if (this.orientation == Orientation.Left) {
                xModifier = -11
            } else if (this.orientation == Orientation.Right) {
                xModifier = 43
            }

            let bullet = new Bullet(this.x + xModifier, this.y + yModifier, this.bulletSpeed,this.orientation);
            this.reload = 0.8;
            this.objectPool && this.objectPool.addObject(bullet)
        }

        this.reload -= dt;
        this.stuck.up = false;
        this.stuck.down = false;
        this.stuck.left = false;
        this.stuck.right = false
    }

    render(spriteSheet: SpriteSheet, ctx) {
        spriteSheet.yellowTank[this.level][this.orientation][this.stateIndex > 10 ? "s0" : "s1"].draw({
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            ctx: ctx
        })
    }

    setObjectPool(objectPool: ObjectPool) {
        this.objectPool = objectPool;
    }
}

export default Tank
