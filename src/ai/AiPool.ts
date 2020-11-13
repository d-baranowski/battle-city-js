import IAiController from "./IAiController";

class AiPool {
    private totalElapsedTime = 0;
    private ais: Array<IAiController> = [];

    addObject(object: IAiController) {
        this.ais.push(object);
    }

    update(dt) {
        this.totalElapsedTime += dt;
        this.ais = this.ais.filter(o => !o.isDestroyed());
        this.ais.forEach(o => o.update(dt, this.totalElapsedTime));
    }
}

export default AiPool
