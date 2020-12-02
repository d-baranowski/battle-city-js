import Board from "./Board";
import ObjectPool from "./ObjectPool";
import Orientation from "./Orientation";
import IGameObject, {IDynamicGameObject} from "./IGameObject";


interface IPositionalElement {
    x: number
    y: number
    width: number
    height: number
}

class Collider {
    private readonly board: Board;
    private readonly objectPool: ObjectPool;

    constructor(board: Board, objectPool: ObjectPool) {
        this.board = board;
        this.objectPool = objectPool;
    }

    static overlaps(o1: IPositionalElement, o2: IPositionalElement): boolean {
        return (o1.x + o1.width > o2.x &&
            o1.x < o2.x + o2.width &&
            o1.y + o1.height > o2.y &&
            o1.y < o2.y + o2.height);
    }

    static resolveCollision(o1: IDynamicGameObject, o2:IGameObject): boolean {
        if (Collider.overlaps(o1, o2)) {
            o1.x = o1.ox;
            o1.y = o1.oy;
        }

        return false;
    }

    resolveCollisions() {
        const objects = this.objectPool.getObjects().sort(o => {
            if (o.constructor.name === "Brick") {
                return 1
            }
            return -1
        });

        for (let i = 0; i < objects.length; i++) {
            let o1 = objects[i];
            if (o1.x >= this.board.padding.left + this.board.width - o1.width ) {
                o1.x = this.board.padding.left + this.board.width - o1.width;
                o1.resolveCollision("wall-right")
            }
            if (o1.x <= this.board.padding.left) {
                o1.resolveCollision("wall-left");
                o1.x = this.board.padding.left
            }
            if (o1.y >= this.board.height + this.board.padding.top - o1.height) {
                o1.resolveCollision("wall-down");
                o1.y = this.board.height + this.board.padding.top - o1.height
            }
            if (o1.y <= this.board.padding.top) {
                o1.resolveCollision("wall-up");
                o1.y = this.board.padding.top
            }

            for (let j = 0; j < objects.length; j++) {
                if (i === j) {
                    continue;
                }

                let o2 = objects[j];
                if (Collider.overlaps(o1, o2) && o2.isColliding(o1.constructor.name, o1) && o1.isColliding(o2.constructor.name, o2)) {
                    o1.resolveCollision(o2.constructor.name, o2);
                }

            }
        }
    }
}

export default Collider

