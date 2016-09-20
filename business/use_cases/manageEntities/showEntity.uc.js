export default class ShowEntityUseCase {
  constructor(entityClass) {
    this.EntityClass = entityClass;
  }

  execute(id) {
    const entity = new this.EntityClass();

    return entity.findById(id);
  }
}
