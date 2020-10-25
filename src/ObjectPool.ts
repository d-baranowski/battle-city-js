import IGameObject from "./IGameObject";

class ObjectPool {
  private objects: Array<IGameObject> = [];
  addObject(object: IGameObject) {
    this.objects.push(object);
    object.setObjectPool(this)
  }
  update(dt){
    this.objects = this.objects.filter(o => !o.destroyed);
    this.objects.forEach(o => o.update(dt));
  }
  getObjects(): Array<IGameObject> {
    return this.objects
  }
}

export default ObjectPool
