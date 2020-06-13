import SpriteSheet from "./sprite/SpriteSheet";
import Renderer from "./Renderer";
import Tank from "./tank/Tank";
import playerOneControls from "./controller/playerOneDefaultControls";
import KeyControls from "./controller/KeyControls";
import Bullet from "./tank/bullet/Bullet";
import Orientation from "./Orientation";


async function init() {
    const spriteSheet = new SpriteSheet();
    const canvas = document.getElementById("canvas");
    const controls = new KeyControls(playerOneControls);
    const randomBulletL = new Bullet(200, 330, 10, Orientation.Left);
    const randomBulletR = new Bullet(230, 330, 10, Orientation.Right);
    const randomBulletU = new Bullet(260, 330, 10, Orientation.Down);
    const randomBulletD = new Bullet(280, 330, 10, Orientation.Up);

    const renderer = new Renderer(canvas, spriteSheet);
    await renderer.loaded();

    const speed = 100;
    let p1 = new Tank(controls, speed);

    p1.y = 400;

    let dt = 0;
    let last = 0;
    function loopy(ms) {
        requestAnimationFrame(loopy);

        const t = ms / 1000; // Let's work in seconds
        dt = t - last;
        last = t;

        p1.update(dt);

        if (p1.x >= 640 - 20) p1.x = 640 - 20;
        if (p1.x <= 20)  p1.x = 20;
        if (p1.y >= 640 - 20) p1.y = 640 - 20;
        if (p1.y <= 20)  p1.y = 20;

        renderer.render([p1, randomBulletL, randomBulletR, randomBulletU, randomBulletD])

    }
    requestAnimationFrame(loopy);
}

init().catch((err) => {
    console.log(err)
});


