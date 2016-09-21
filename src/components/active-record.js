import InvalidRecordError from './errors/invalid-record-error';

function embedActiveRecord(entity, repository, EntityType, CollectionType) {
  entity.save = function () {
    if (!entity.valid) {
      throw new InvalidRecordError(EntityType.name, entity);
    }

    return repository.save(entity.fetch());
  };

  entity.findById = function (id) {
    return repository
              .find(id)
              .then(values => new EntityType(values));
  };

  entity.list = function (filter, queryOptions) {
    return repository
              .list(filter, queryOptions)
              .then(rawData => new CollectionType(rawData));
  };

  entity.destroy = function () {
    if (!entity.valid) {
      throw new InvalidRecordError(EntityType.name, entity);
    }

    return repository.destroy(entity.id);
  };
}

export default embedActiveRecord;
