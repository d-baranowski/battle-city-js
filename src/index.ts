import SpriteSheet from "./SpriteSheet";
import Renderer from "./Renderer";
import Tank from "./Tank";
import playerOneControls from "./playerOneDefaultControls";
import KeyControls from "./KeyControls";


async function init() {
    const spriteSheet = new SpriteSheet();
    const canvas = document.getElementById("canvas");
    const controls = new KeyControls(playerOneControls);
    
    const renderer = new Renderer(canvas, spriteSheet);
    await renderer.loaded();

    const speed = 200;
    let p1 = new Tank(controls, speed);

    p1.y = 400

    let dt = 0;
    let last = 0;
    function loopy(ms) {
        requestAnimationFrame(loopy);

        const t = ms / 1000; // Let's work in seconds
        dt = t - last;
        last = t;
        
        p1.update(dt)

        if (p1.x >= 640 - 20) p1.x = 640 - 20;
        if (p1.x <= 20)  p1.x = 20;
        if (p1.y >= 640 - 20) p1.y = 640 - 20;
        if (p1.y <= 20)  p1.y = 20;
        
        renderer.render([p1])

    }
    requestAnimationFrame(loopy);
}

init().catch((err) => {
    console.log(err)
});


