// TODO: refactor this file for better readbility and testability

import mongoose from 'mongoose';

function getModelPaths(model) {
  return model.schema.paths;
}

function hasOneToOneRelationship(path, documentModelName) {
  return path.instance === 'ObjectID' && path.options.ref === documentModelName;
}

function hasOneToManyRelationship(path, documentModelName) {
  var i;
  var item;

  if (path.instance === 'Array') {
    for (i = 0; i < path.options.type.length; i++) {
      item = path.options.type[i];

      if (item && item.ref === documentModelName) {
        return true;
      }
    }
  }

  return false;
}

function findPathWithReference(doc, paths) {
  var documentModelName = doc.constructor.modelName;
  var pathsNames = Object.keys(paths);
  var i;
  var pathName;
  var path;

  for (i = 0; i < pathsNames.length; i += 1) {
    pathName = pathsNames[i];
    path = paths[pathName];

    if (hasOneToOneRelationship(path, documentModelName) ||
        hasOneToManyRelationship(path, documentModelName)) {
      return paths[pathName];
    }
  }

  return null;
}

function buildModels(modelNames) {
  return modelNames.map(function (modelName) {
    return mongoose.models[modelName];
  });
}

function buildVerificationPromise(doc, model) {
  return new Promise(function (resolve, reject) {
    var query = {};

    var modelPaths = getModelPaths(model);
    var referencePath = findPathWithReference(doc, modelPaths);

    if (!referencePath) {
      return reject(new Error('Reference of ' + doc.constructor.modelName +
                              ' not found in ' + model.modelName));
    }

    query[referencePath.path] = doc._id;

    model.count(query).exec(function (err, count) {
      if (err) {
        reject(err);
      }
      resolve(count);
    });
  });
}

export default function restrictDelete(modelNames) {
  return function plugin(schema) {
    schema.pre('remove', function (next) {
      var doc = this;

      var models = buildModels(modelNames);

      var promises = models.map(function (model) {
        return buildVerificationPromise(doc, model);
      });

      Promise.all(promises)
        .then(function (counts) {
          var totalCount = counts.reduce(function (prev, current) {
            return prev + current;
          });
          if (totalCount > 0) {
            next(new Error('Unable to delete document, there is ' +
              totalCount + ' documents restricting this deletion.'));
          }
          next();
        })
        .catch(function (error) {
          next(error);
        });
    });
  };
}
