export interface KeyControlsBinding {
    left: string
    right: string
    up: string
    down: string
    fire: string
}

class KeyControls {
    keysPressed: {};
    private readonly keyBinding: KeyControlsBinding;

    constructor(keyBinding: KeyControlsBinding) {
        this.keysPressed = {};
        this.keyBinding = keyBinding;

        // Bind event handlers
        document.addEventListener("keydown", e => {
            if ([this.keyBinding.left, this.keyBinding.right, this.keyBinding.up, this.keyBinding.down, this.keyBinding.fire].indexOf(e.code) >= 0) {
                e.preventDefault();
            }
            if (e.code !== this.keyBinding.fire) {
                this.reset();
            }
            this.keysPressed[e.code] = true;
        }, false);

        document.addEventListener("keyup", e => {
            this.keysPressed[e.code] = false;
        }, false);
    }

    reset() {
        this.keysPressed[this.keyBinding.right] = false;
        this.keysPressed[this.keyBinding.left] = false;
        this.keysPressed[this.keyBinding.up] = false;
        this.keysPressed[this.keyBinding.down] = false
    }

    // Handle key actions
    shouldFire(): boolean {
        return this.keysPressed[this.keyBinding.fire];
    }

    shouldMoveLeft(): boolean {
        return this.keysPressed[this.keyBinding.left];
    }

    shouldMoveRight(): boolean {
        return this.keysPressed[this.keyBinding.right];
    }

    shouldMoveUp(): boolean {
        return this.keysPressed[this.keyBinding.up];
    }

    shouldMoveDown(): boolean {
        return this.keysPressed[this.keyBinding.down];
    }
}

export default KeyControls
