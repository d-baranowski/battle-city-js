import SpriteSheet from "./sprite/SpriteSheet";
import Renderer from "./Renderer";
import Tank from "./tank/Tank";
import playerOneControls from "./controller/playerOneDefaultControls";
import KeyControls from "./controller/KeyControls";
import Bullet from "./tank/bullet/Bullet";
import Orientation from "./Orientation";
import ObjectPool from "./ObjectPool";


async function init() {
    const spriteSheet = new SpriteSheet();
    const canvas = document.getElementById("canvas");
    const controls = new KeyControls(playerOneControls);

    const objectPool = new ObjectPool();
    
    const randomBulletL = new Bullet(200, 330, 10, Orientation.Left);
    const randomBulletR = new Bullet(230, 330, 10, Orientation.Right);
    const randomBulletU = new Bullet(260, 330, 10, Orientation.Down);
    const randomBulletD = new Bullet(280, 330, 10, Orientation.Up);

    const renderer = new Renderer(canvas, spriteSheet);
    await renderer.loaded();

    const speed = 100;
    objectPool.addObject(new Tank(150, 400, controls, speed));

    let dt = 0;
    let last = 0;
    function loopy(ms) {
        requestAnimationFrame(loopy);

        const t = ms / 1000; // Let's work in seconds
        dt = t - last;
        last = t;

        objectPool.getObjects().forEach(o => o.update(dt));

        // if (p1.x >= 640 - 20) p1.x = 640 - 20;
        // if (p1.x <= 20)  p1.x = 20;
        // if (p1.y >= 640 - 20) p1.y = 640 - 20;
        // if (p1.y <= 20)  p1.y = 20;

        renderer.render(objectPool.getObjects())

    }
    requestAnimationFrame(loopy);
}

init().catch((err) => {
    console.log(err)
});


