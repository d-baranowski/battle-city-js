import IGameObject from "./IGameObject";

class ObjectPool {
  private objects: Array<IGameObject> = []
  addObject(object: IGameObject) {
    this.objects.push(object)
    object.setObjectPool(this)
  }
  update(){
    this.objects = this.objects.filter(o => !o.destroyed)
  }
  getObjects(): Array<IGameObject> {
    return this.objects
  } 
}

export default ObjectPool