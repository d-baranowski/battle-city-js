import { KeyControlsBinding } from "./KeyControls"
import * as KeyCode from 'keycode-js';

const playerOneControls: KeyControlsBinding = {
    up: KeyCode.KEY_UP,
    down: KeyCode.KEY_DOWN,
    left: KeyCode.KEY_LEFT,
    right: KeyCode.KEY_RIGHT,
    fire:  KeyCode.KEY_SPACE
}

export default playerOneControls