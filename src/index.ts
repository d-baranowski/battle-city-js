import Board from "./Board";
import SpriteSheet from "./sprite/SpriteSheet";
import Renderer from "./Renderer";
import playerOneControls from "./controller/playerOneDefaultControls";
import KeyControls from "./controller/KeyControls";
import ObjectPool from "./ObjectPool";
import Collider from "./Collider";
import MapEditor from "./map-editor/MapEditor";
import AiPool from "./ai/AiPool";


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

async function init() {
    const spriteSheet = new SpriteSheet();
    const canvas = document.getElementById("canvas");

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
        aiPool.update(dt);
    }
    requestAnimationFrame(loopy);
}

init().catch((err) => {
    console.log(err)
});


