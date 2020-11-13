interface IAiController {
    isDestroyed(): boolean
    update(timeSinceLastUpdate: number, totalTimeElapsed: number);
}

export default IAiController;
