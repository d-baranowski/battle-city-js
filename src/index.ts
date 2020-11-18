import Board from "./Board";
import SpriteSheet from "./sprite/SpriteSheet";
import Renderer from "./Renderer";
import playerOneControls from "./controller/playerOneDefaultControls";
import KeyControls from "./controller/KeyControls";
import ObjectPool from "./ObjectPool";
import Collider from "./Collider";
import MapEditor from "./map-editor/MapEditor";
import AiPool from "./ai/AiPool";
import Ray from "../lib/2d/Ray";
import Vector from "../lib/2d/Vector";
import Rectangle from "../lib/2d/Rectangle";
import {RayVsRect} from "../lib/rectangle-collision-resolution";


const map =
`# #     # #   #
# 0    0   0 0 #
#              #
#     @        #
# 0      0     #
#              #
# # # #  # # # #
#    #  #      #
#   #    #     #
#   #     #    #
#   #  #  #  # #
#      0   0   #
# # # # # # # #`;

export const PLAYER_ONE_CONTROLS = new KeyControls(playerOneControls);
export const PLAYER_INITIAL_LIVES = 3;
let mousePos = { x: 0, y: 0 };

async function init() {
    const spriteSheet = new SpriteSheet();
    const canvas =  <HTMLCanvasElement> document.getElementById("canvas");

    let ray = new Ray(new Vector(800,600 ), new Vector(0, 0));
    let rec = new Rectangle(500, 250, 100 ,100);

    canvas && canvas.addEventListener('mousemove', e => {
        let pos = getMousePos(canvas, e);
        mousePos = pos;
        ray.direction = new Vector(pos.x, pos.y).subtract(ray.start)
    });

    const objectPool = new ObjectPool();
    const aiPool = new AiPool();

    const board = new Board(16, 13);

    const mapEditor = new MapEditor(board);

    mapEditor.parseMap(map);
    mapEditor.populatePool(objectPool, aiPool);

    const renderer = new Renderer(canvas, spriteSheet, board);
    await renderer.loaded();

    const collider = new Collider(board, objectPool);

    let dt = 0;
    let last = 0;
    function loopy(ms) {
        requestAnimationFrame(loopy);

        const t = ms / 1000; // Let's work in seconds
        dt = t - last;
        last = t;

        objectPool.update(dt);
        collider.resolveCollisions();
        renderer.render(objectPool.getObjects());
        renderer.ctx.clearRect(0, 0, 1000, 1000);
        ray.draw(renderer.ctx);


        const collisionInfo = RayVsRect(ray, rec);
        if (collisionInfo.collision && collisionInfo.t && collisionInfo.t <= 1) {
            renderer.ctx.fillStyle = "#FF0000";
        } else {
            renderer.ctx.fillStyle = "#000000";
        }
        rec.draw(renderer.ctx);
        renderer.ctx.fillStyle = "#000000";
        collisionInfo.contactPoint && renderer.ctx.fillRect(collisionInfo.contactPoint.x, collisionInfo.contactPoint.y, 10, 10);
        collisionInfo.contactNormal && console.log(collisionInfo.contactNormal.toString());
        aiPool.update(dt);
    }
    requestAnimationFrame(loopy);
}

function  getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

    return {
        x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}

init().catch((err) => {
    console.log(err)
});


