import TankController from "../controller/TankController";
import Tank from "../tank/Tank";
import IGameObject from "../IGameObject";
import IAiController from "./IAiController";

enum State {
    Up,
    Down,
    Left,
    Right,
    Seek,
    Rest
}

const movementPool = [
    State.Down,
    State.Down,
    State.Down,
    State.Up,
    State.Left,
    State.Left,
    State.Right,
    State.Right,
];

class EasyAIController implements TankController, IAiController {
    private readonly tank: Tank;
    private state: State = State.Seek;
    private shotsLeft: number = 0;
    private timeLeftToMove: number = 0;

    constructor(tank: Tank) {
        this.tank = tank;
    }

    shouldFire(): boolean {
        if (this.shotsLeft > 0) {
            this.shotsLeft--;
        }
        return this.shotsLeft > 0;
    }

    shouldMoveDown(): boolean {
        return this.state === State.Down;
    }

    shouldMoveLeft(): boolean {
        return this.state === State.Left;
    }

    shouldMoveRight(): boolean {
        return this.state === State.Right;
    }

    shouldMoveUp(): boolean {
        return this.state === State.Up;
    }

    onCollision(objectType: string, obj: IGameObject) {
        if (objectType == "wall-left" ||
            objectType == "wall-right" ||
            objectType == "wall-up" ||
            objectType == "wall-down") {
            this.state = State.Seek;
            this.timeLeftToMove = 0;
        }

        if (objectType == "Brick") {
            this.state = State.Seek;
        }
    }

    isDestroyed(): boolean {
        return false;
    }

    update(timeSinceLastUpdate: number, totalTimeElapsed: number) {
        if (this.state === State.Seek) {
            this.state = movementPool[Math.floor(Math.random() * movementPool.length)];
            this.timeLeftToMove = (Math.floor(Math.random() * 15) + 5) * 100
            console.log("seeking", this.state, this.timeLeftToMove);
        }
        else if (this.state === State.Left
            || this.state === State.Right
            || this.state === State.Up
            || this.state === State.Down) {
            this.timeLeftToMove -= timeSinceLastUpdate;
            console.log("moving", this.state, this.timeLeftToMove);
        }
    }
}

export default EasyAIController;
