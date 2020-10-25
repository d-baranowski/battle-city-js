import Board from "../Board";
import ObjectPool from "../ObjectPool";
import Tank from "../tank/Tank";
import {PLAYER_INITIAL_LIVES, PLAYER_ONE_CONTROLS} from "../index";
import Brick, {BRICK_DIMENSION} from "../brick/Brick";


const PLAYER_1_SYMBOL = "@";
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

    public populatePool(pool: ObjectPool) {
        this.forEach((symbol, i, j) => {
            if (symbol === PLAYER_1_SYMBOL) {
                pool.addObject(new Tank( i * BRICK_DIMENSION + this.board.padding.left, j * BRICK_DIMENSION + this.board.padding.top, PLAYER_ONE_CONTROLS, 0, PLAYER_INITIAL_LIVES));
            } else if (symbol == BRICK_SYMBOL) {
                pool.addObject(new Brick(i * BRICK_DIMENSION + this.board.padding.left, j * BRICK_DIMENSION + this.board.padding.top));
            }
        })
    }
}

export default MapEditor
