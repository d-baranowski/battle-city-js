import IGameObject from "../IGameObject";

interface TankController {
  shouldFire():boolean
  shouldMoveLeft():boolean
  shouldMoveRight():boolean
  shouldMoveUp():boolean
  shouldMoveDown():boolean
  onCollision(objectType: string, obj: IGameObject)
}

export default TankController
