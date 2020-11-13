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
    Shoot,
    Stop
}

const movementPool = [
    State.Down,
    State.Down,
    State.Down,
    State.Up,
    State.Left,
    State.Left,
    State.Left,
    State.Left,
    State.Right,
    State.Right,
    State.Right,
    State.Right,
];

function getRandomMovementState(tank) {
    let directions = movementPool;
    if (tank.stuck.left) {
        directions= directions.filter(d => d != State.Left)
    }
    if (tank.stuck.right) {
        directions = directions.filter(d => d != State.Right)
    }
    if (tank.stuck.up) {
        directions = directions.filter(d => d != State.Up)
    }
    if (tank.stuck.down) {
        directions =  directions.filter(d => d != State.Down)
    }

    return directions[Math.floor(Math.random() * directions.length)];
}

class EasyAIController implements TankController, IAiController {
    private readonly tank: Tank;
    private state: State = State.Seek;
    private sleep = 0;
    private timeLeftToMove = 0;

    constructor(tank: Tank) {
        this.tank = tank;
    }

    shouldFire(): boolean {
        return true;
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
        if (this.state === State.Seek) {
            return;
        }

        if (objectType == "wall-left" ||
            objectType == "wall-right" ||
            objectType == "wall-up" ||
            objectType == "wall-down") {
            this.state = State.Seek;
        }

        if (objectType == "Brick" && this.sleep <= 0) {
            this.state = State.Seek;
            this.sleep = (Math.floor(Math.random() * 5) + 1) * 0.2;
        }
    }

    isDestroyed(): boolean {
        return false;
    }

    update(timeSinceLastUpdate: number, totalTimeElapsed: number) {
        if (this.sleep > 0) {
            this.sleep -= timeSinceLastUpdate;
            return;
        }

        if (this.timeLeftToMove <= 0) {
            this.state = State.Seek;
        }

        if (this.state === State.Seek) {
            this.state = getRandomMovementState(this.tank);
            this.timeLeftToMove = (Math.floor(Math.random() * 10) + 1) * 0.2;
        }

        else if (this.state === State.Left
            || this.state === State.Right
            || this.state === State.Up
            || this.state === State.Down
            || this.state === State.Shoot) {
            this.timeLeftToMove -= timeSinceLastUpdate
        }
    }
}

export default EasyAIController;
