import _ from 'lodash';
import logger from './Logger';

const VALIDATION_ERROR_MSG = 'ValidationError';
const PARSE_ERROR_MSG = 'Found error when parsing parameters: ';
const PIPELINE_ERROR_MSG = 'Pipeline required !';

function jsonParse(value) {
  return _.isUndefined(value) ? null : JSON.parse(value);
}

export default function assignCrudController(controller, model, options) {

  controller.handleSingleQueryParametersErrors = function (req, res) {
    try {
      req.query.filter = jsonParse(req.query.filter);
      req.query.sort = jsonParse(req.query.sort);
      req.query.populate = jsonParse(req.query.populate);
    } catch (err) {
      logger.warning('Error parsing query parameters. Sending bad request. Error: ' + err);
      return new ResponseHandler(res).badRequest(PARSE_ERROR_MSG + req.query);
    }

    return true;
  };

  controller.handleAggregateQueryParametersErrors = function (req, res) {
    try {
      req.query.pipeline = jsonParse(req.query.pipeline);
    } catch (err) {
      logger.warning('Error parsing aggregate query parameters. ' +
        'Sending bad request. Error: ' + err);
      return new ResponseHandler(res).badRequest(PARSE_ERROR_MSG + req.query);
    }
    return true;
  };

  controller.getIndexQuery = function (req) {
    var query = model.find(req.query.filter || null);
    var limit = parseInt(req.query.limit, 10);
    var skip = parseInt(req.query.skip, 10);

    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    if (req.query.populate) {
      query = query.populate(req.query.populate);
    }

    if (skip && !isNaN(skip)) {
      query = query.skip(parseInt(req.query.skip, 10));
    }

    if (limit && !isNaN(limit)) {
      query = query.limit(parseInt(req.query.limit, 10));
    }

    return query;
  };

  controller.index = function (req, res) {
    var query;

    if (!controller.handleSingleQueryParametersErrors(req, res)) {
      return;
    }

    query = controller.getIndexQuery(req, res);

    logger.debug('Executing query: ' + query);

    query.exec(function (err, entities) {
      if (err) {
        logger.error('Error executing query... Error: ' + err);
        return new ResponseHandler(res).internalError(err);
      }

      new ResponseHandler(res).success(entities);
    });
  };

  controller.count = function (req, res) {
    var query;

    if (!controller.handleSingleQueryParametersErrors(req, res)) {
      return;
    }

    query = controller.getIndexQuery(req, res);

    logger.debug('counting query: ' + query);

    query.count().exec(function (err, count) {
      if (err) {
        logger.error('Error executing query... Error: ' + err);
        return new ResponseHandler(res).internalError(err);
      }

      new ResponseHandler(res).success({ count: count });
    });
  };

  controller.aggregate = function (req, res) {
    var pipeline;
    var query;

    if (!controller.handleAggregateQueryParametersErrors(req, res)) {
      return;
    }

    pipeline = req.query.pipeline;

    if (!pipeline) {
      pipeline = req.body;
    }

    if (!pipeline) {
      return new ResponseHandler(res).badRequest(PIPELINE_ERROR_MSG);
    }

    query = model.aggregate(pipeline);

    logger.debug('aggregation query: ' + query);

    query.exec(function (err, results) {
      if (err) {
        logger.error('Error executing query... Error: ' + err);
        return new ResponseHandler(res).internalError(err);
      }

      new ResponseHandler(res).success(results);
    });
  };

  controller.show = function (req, res) {
    var query;

    if (!controller.handleSingleQueryParametersErrors(req, res)) {
      return;
    }

    query = model.findById(req.params.id);

    if (req.query.populate) {
      query = query.populate(req.query.populate);
    }

    logger.debug('creating query: ' + query);

    query.exec(function (err, entity) {
      if (err) {
        logger.error('Error executing query... Error: ' + err);
        return new ResponseHandler(res).internalError(err);
      }

      if (!entity) {
        return new ResponseHandler(res).notFound();
      }

      new ResponseHandler(res).success(entity);
    });
  };

  controller.create = function (req, res) {
    var params = helpers.permit(req.body, options.whitelist);
    var entity = new model(params);

    logger.debug('creating model: ' + entity);

    return entity.save(function (err) {
      if (err && err.name === VALIDATION_ERROR_MSG) {
        return new ResponseHandler(res).badRequest(err);
      }

      if (err) {
        logger.error('Error creating model... Error: ' + err);
        return new ResponseHandler(res).internalError(err);
      }

      new ResponseHandler(res).success(entity);
    });
  };

  controller.update = function (req, res) {
    var id = req.params.id;
    var params = helpers.permit(req.body, options.whitelist);

    logger.debug('updating model id: ' + id);

    model.findById(id).exec(function (findError, entity) {
      if (findError) {
        logger.error('Error searching model for update... Error: ' + findError);
        return new ResponseHandler(res).internalError(findError);
      }

      if (!entity) {
        return new ResponseHandler(res).notFound();
      }

      entity = _.assignIn(entity, params);

      entity.save(function (saveError) {
        if (saveError && saveError.name === VALIDATION_ERROR_MSG) {
          return new ResponseHandler(res).badRequest(saveError);
        }

        if (saveError) {
          logger.error('Error updating model... Error: ' + saveError);
          return new ResponseHandler(res).internalError(saveError);
        }

        new ResponseHandler(res).success(entity);
      });
    });
  };

  controller.destroy = function (req, res) {
    var id = req.params.id;

    logger.debug('deleting model id: ' + id);

    model.findById(id).exec(function (findError, entity) {
      if (findError) {
        logger.error('Error searching model for delete... Error: ' + findError);
        return new ResponseHandler(res).internalError(findError);
      }

      if (!entity) {
        return new ResponseHandler(res).notFound();
      }

      entity.remove(function (removeError) {
        if (removeError) {
          logger.error('Error deleting model... Error: ' + removeError);
          return new ResponseHandler(res).internalError(removeError);
        }

        new ResponseHandler(res).noContent();
      });
    });
  };
}
