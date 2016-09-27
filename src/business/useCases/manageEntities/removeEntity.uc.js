export default class RemoveEntityUseCase {
  constructor(entityClass) {
    this.EntityClass = entityClass;
  }

  execute(id) {
    const entity = new this.EntityClass();

    return entity
            .findById(id)
            .then(item => item.destroy());
  }
}
