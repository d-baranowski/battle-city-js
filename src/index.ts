import SpriteSheet from "./SpriteSheet";
import Renderer from "./Renderer";
import Tank from "./Tank";

async function init() {
    const spriteSheet = new SpriteSheet();
    const canvas = document.getElementById("canvas");
    const tank = new Tank();

    const renderer = new Renderer(canvas, spriteSheet);
    await renderer.loaded();
    renderer.render([tank]);
}

init().catch((err) => {
    console.log(err)
});


