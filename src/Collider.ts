import Board from "./Board";
import ObjectPool from "./ObjectPool";


class Collider {
    private readonly board: Board;
    private readonly objectPool: ObjectPool;

    constructor(board: Board, objectPool: ObjectPool) {
        this.board = board;
        this.objectPool = objectPool;  
    }

    resolveCollisions() {
        const objects = this.objectPool.getObjects()
        for (let i=0; i < objects.length; i++) {
            let o1 = objects[i] 
            if (o1.x >= this.board.width - o1.width/2) {
                o1.resolveCollision("wall")
            }
            if (o1.x <= o1.width/2) {
                o1.resolveCollision("wall")
            }
            if (o1.y >= this.board.height - o1.height/2) {
                o1.resolveCollision("wall")
            }
            if (o1.y <= o1.height/2) {
                o1.resolveCollision("wall")
            }

        }
        
    }

 
}

export default Collider
