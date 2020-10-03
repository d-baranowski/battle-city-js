import Board from "./Board";
import SpriteSheet from "./sprite/SpriteSheet";
import Renderer from "./Renderer";
import Tank from "./tank/Tank";
import playerOneControls from "./controller/playerOneDefaultControls";
import KeyControls from "./controller/KeyControls";
import ObjectPool from "./ObjectPool";
import Collider from "./Collider";
import Brick from "./brick/Brick";

async function init() {
    const spriteSheet = new SpriteSheet();
    const canvas = document.getElementById("canvas");
    const controls = new KeyControls(playerOneControls);

    const objectPool = new ObjectPool();

    const board = new Board(800, 640);

    const renderer = new Renderer(canvas, spriteSheet, board);
    await renderer.loaded();

    const collider = new Collider(board, objectPool);

    const speed = 300;
    objectPool.addObject(new Tank(120, 400, controls, speed, 42, 42));
    objectPool.addObject(new Brick(180, 420));
    objectPool.addObject(new Brick(180, 466));
    objectPool.addObject(new Brick(180, 512));
    objectPool.addObject(new Brick(180, 558));


    let dt = 0;
    let last = 0;
    function loopy(ms) {
        requestAnimationFrame(loopy);

        const t = ms / 1000; // Let's work in seconds
        dt = t - last;
        last = t;

        objectPool.update(dt);
        collider.resolveCollisions();
        renderer.render(objectPool.getObjects())
    }
    requestAnimationFrame(loopy);
}

init().catch((err) => {
    console.log(err)
});


