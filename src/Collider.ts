import Board from "./Board";
import ObjectPool from "./ObjectPool";
import IGameObject from "./IGameObject";


class Collider {
    private readonly board: Board;
    private readonly objectPool: ObjectPool;

    constructor(board: Board, objectPool: ObjectPool) {
        this.board = board;
        this.objectPool = objectPool;
    }

    static overlaps(o1: IGameObject, o2: IGameObject): boolean {
        return (o1.x + o1.width >= o2.x &&
            o1.x <= o2.x + o2.width &&
            o1.y + o1.height >= o2.y &&
            o1.y <= o2.y + o2.height);
    }

    resolveCollisions() {
        const objects = this.objectPool.getObjects();
        for (let i = 0; i < objects.length; i++) {
            let o1 = objects[i];
            if (o1.x >= this.board.width - 1 - o1.width / 2) {
                o1.x = this.board.width - (o1.width / 2) - 1
                o1.resolveCollision("wall-right")
            }
            if (o1.x <= o1.width / 2 - 1) {
                o1.resolveCollision("wall-left")
                o1.x = o1.width / 2 - 1
            }
            if (o1.y >= this.board.height - 1 - o1.height / 2) {
                o1.resolveCollision("wall-down")
                o1.y = this.board.height - (o1.height / 2) - 1
            }
            if (o1.y <= o1.height / 2 - 1) {
                o1.resolveCollision("wall-up")
                o1.y = o1.height / 2 - 1
            }

            for (let j = 0; j < objects.length; j++) {
                if (i === j) {
                    continue;
                }

                let o2 = objects[j];
                if (Collider.overlaps(o1, o2)) {
                    o1.resolveCollision(o2.constructor.name);
                }
            }
        }

    }


}

export default Collider

