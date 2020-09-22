import Board from "./Board";
import SpriteSheet from "./sprite/SpriteSheet";
import Renderer from "./Renderer";
import Tank from "./tank/Tank";
import playerOneControls from "./controller/playerOneDefaultControls";
import KeyControls from "./controller/KeyControls";
import Bullet from "./tank/bullet/Bullet";
import Orientation from "./Orientation";
import ObjectPool from "./ObjectPool";
import Collider from "./collider";




async function init() {
    const spriteSheet = new SpriteSheet();
    const canvas = document.getElementById("canvas");
    const controls = new KeyControls(playerOneControls);

    const objectPool = new ObjectPool();

    const randomBulletL = new Bullet(200, 330, 10, Orientation.Left);
    const randomBulletR = new Bullet(230, 330, 10, Orientation.Right);
    const randomBulletU = new Bullet(260, 330, 10, Orientation.Down);
    const randomBulletD = new Bullet(280, 330, 10, Orientation.Up);

    const board = new Board(800, 640);

    const renderer = new Renderer(canvas, spriteSheet, board);
    await renderer.loaded();

    const collider = new Collider(board, objectPool);

    const speed = 100;
    objectPool.addObject(new Tank(150, 400, controls, speed, 42, 42));
    objectPool.addObject(new Tank(300, 400, controls, speed, 42, 42));

    let dt = 0;
    let last = 0;
    function loopy(ms) {
        requestAnimationFrame(loopy);

        const t = ms / 1000; // Let's work in seconds
        dt = t - last;
        last = t;

        collider.resolveCollisions();
        objectPool.update();
        objectPool.getObjects().forEach(o => o.update(dt));
        renderer.render(objectPool.getObjects())

    }
    requestAnimationFrame(loopy);
}

init().catch((err) => {
    console.log(err)
});


