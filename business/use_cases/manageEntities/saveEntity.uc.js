
export default class SaveEntityUseCase {
  constructor(entityClass) {
    this.EntityClass = entityClass;
  }

  execute(values) {
    const entity = new this.EntityClass(values);

    return entity.save();
  }
}
