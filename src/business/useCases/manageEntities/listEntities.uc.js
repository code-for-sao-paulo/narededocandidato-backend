export default class ListEntitiesUseCase {
  constructor(entityClass) {
    this.EntityClass = entityClass;
  }

  execute(filter, queryOptions) {
    const entity = new this.EntityClass();

    return entity.list(filter, queryOptions);
  }
}
