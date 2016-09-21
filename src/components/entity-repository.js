//merge with entity repository

export default function embedEntityRepository(repository, model) {
  // Save
  repository.save = function (values) {
    return model.upsert(values);
  };

  // Read many
  repository.list = function (filter, queryOptions) {
    if (!filter) {
      return model.all();
    }

    const options = {
      where: filter
    };

    if (queryOptions.limit) {
      options.limit = queryOptions.limit;
    }

    if (queryOptions.offset) {
      options.offset = queryOptions.offset;
    }

    if (queryOptions.order) {
      options.order = queryOptions.order;
    }

    if (queryOptions.sort) {
      options.sort = queryOptions.sort;
    }

    if (queryOptions.include) {
      options.include = queryOptions.include;
    }

    return model.findAll(options);
  };

  // Read one
  repository.find = function (id) {
    return model.findById(id);
  };

  // Delete
  repository.destroy = function (id) {
    return model.destroy({
      where: { id }
    });
  };
}
