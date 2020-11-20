import Board from "./Board";
import SpriteSheet from "./sprite/SpriteSheet";
import Renderer from "./Renderer";
import playerOneControls from "./controller/playerOneDefaultControls";
import KeyControls from "./controller/KeyControls";
import ObjectPool from "./ObjectPool";
import Collider from "./Collider";
import MapEditor from "./map-editor/MapEditor";
import AiPool from "./ai/AiPool";
import Vector from "../lib/2d/Vector";
import DynamicRectangle from "../lib/2d/DynamicRectangle";
import {DynamicRectangleVsRectangle} from "../lib/rectangle-collision-resolution";


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

const rectangles = [
    new DynamicRectangle(10, 10, 30, 20, new Vector(1, 0)),
    new DynamicRectangle(100, 100, 80, 100, new Vector(0, 0)),
];

async function init() {
    const spriteSheet = new SpriteSheet();
    const canvas =  <HTMLCanvasElement> document.getElementById("canvas");

    canvas && canvas.addEventListener('click', e => {
        let pos = getMousePos(canvas, e);
        mousePos = pos;
        rectangles[0].velocity = new Vector(pos.x, pos.y).subtract(rectangles[0].position).normalise().multiplyByScalar(100)
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
        renderer.render(objectPool.getObjects());
        renderer.ctx.clearRect(0, 0, 1000, 1000);

        rectangles.forEach((r, i) => {
            r.draw(renderer.ctx);

            if (i > 0) {
                const collisionInfo = DynamicRectangleVsRectangle(rectangles[0], r, dt);

                if (collisionInfo.collision && collisionInfo.contactNormal && collisionInfo.t) {
                    console.log(collisionInfo);
                    console.log("======================================");
                    let v = rectangles[0].velocity.clone().absolute();
                    // console.log("v", v);
                    let cn = collisionInfo.contactNormal.clone();
                    // console.log("cn 1", cn);
                    // console.log(`${cn} * ${v} = ${cn.multiplyByVector(v)}`);
                    console.log(`${cn} * ${1 - collisionInfo.t} = ${cn.multiplyByScalar(1 - collisionInfo.t)}`);
                    console.log("cn 2", cn);
                    console.log("vel 1", rectangles[0].velocity);
                    console.log(`${rectangles[0].velocity} = ${rectangles[0].velocity} + ${cn}`);
                    rectangles[0].velocity = rectangles[0].velocity.clone().add(cn);
                }
            }

            r.displace(dt);
        });

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


