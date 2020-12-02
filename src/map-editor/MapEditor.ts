import Board from "../Board";
import ObjectPool from "../ObjectPool";
import Tank from "../tank/Tank";
import {PLAYER_INITIAL_LIVES, PLAYER_ONE_CONTROLS} from "../index";
import Brick, {BRICK_DIMENSION} from "../brick/Brick";
import AiPool from "../ai/AiPool";
import EasyAIController from "../ai/EasyAIController";


const PLAYER_1_SYMBOL = "@";
const ENEMY_SYMBOL = "0";
const BRICK_SYMBOL = "#";

class MapEditor {
    // grid[i][j] i is the row and j is the column
    private readonly grid: string[][];
    private readonly gridHeight: number;
    private readonly gridWidth: number;
    private board: Board;


    constructor(board: Board) {
        this.board = board;
        this.gridWidth = board.gridWidth;
        this.gridHeight = board.gridHeight;
        this.grid = new Array(board.gridHeight);
        for (let i = 0; i < board.gridWidth; i++) {
            this.grid[i] = new Array(board.gridWidth);
        }
    }

    public placeElement(x: number, y: number, element: string) {
        this.grid[y][x] = element
    }

    public parseMap(map: string) {
        const rows = map.split('\n');
        rows.forEach((row, rowIndex) => {
            for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
                this.placeElement(rowIndex, columnIndex, row[columnIndex]);
            }
        })
    }

    public forEach(callback) {
        for (let i = 0; i < this.gridWidth; i++) {
            for (let j = 0; j < this.gridHeight; j++) {
                callback(this.grid[i][j], i, j)
            }
        }
    }

    private tempSpawnTank(x, y, objectPool: ObjectPool, aiPool: AiPool) {
        const tank = new Tank( x, y, 0, 1);
        const controller = new EasyAIController(tank);
        tank.setController(controller);
        objectPool.addObject(tank);
        aiPool.addObject(controller);
    }

    public populatePool(objectPool: ObjectPool, aiPool: AiPool) {
        this.forEach((symbol, i, j) => {
            if (symbol === PLAYER_1_SYMBOL) {
                const tank = new Tank( i * BRICK_DIMENSION + this.board.padding.left, j * BRICK_DIMENSION + this.board.padding.top, 0, PLAYER_INITIAL_LIVES)
                tank.setController(PLAYER_ONE_CONTROLS);
                objectPool.addObject(tank);

            } else if (symbol == BRICK_SYMBOL) {
                objectPool.addObject(new Brick(i * BRICK_DIMENSION + this.board.padding.left, j * BRICK_DIMENSION + this.board.padding.top));
            } if (symbol === ENEMY_SYMBOL) {
                this.tempSpawnTank(i * BRICK_DIMENSION + this.board.padding.left, j * BRICK_DIMENSION + this.board.padding.top, objectPool, aiPool)
            }
        });
    }
}

export default MapEditor
