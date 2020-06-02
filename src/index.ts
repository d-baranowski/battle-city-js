import SpriteSheet from "./SpriteSheet";
import Renderer from "./Renderer";
import Tank from "./Tank";

async function init() {
    const spriteSheet = new SpriteSheet();
    const canvas = document.getElementById("canvas");
    const tank = new Tank();

    const renderer = new Renderer(canvas, spriteSheet);
    await renderer.loaded();

    const speed = 64;
    let p1 = new Tank();
    let p2 = new Tank();

    p1.y = 40
    p2.y = 70

    let dt = 0;
    let last = 0;
    function loopy(ms) {
        requestAnimationFrame(loopy);

        const t = ms / 1000; // Let's work in seconds
        dt = t - last;
        last = t;

        // Game logic code

        p1.x += speed * dt;
        p2.x += speed * (1 / 60);
        if (p1.x > 500) p1.x -= 500 + 50;
        if (p2.x > 500) p2.x -= 500 + 50;

        renderer.render([p1, p2])

    }
    requestAnimationFrame(loopy);
}

init().catch((err) => {
    console.log(err)
});


