import ShowEntityUseCase from '../business/useCases/manageEntities/showEntity.uc';
import ListEntitiesUseCase from '../business/useCases/manageEntities/listEntities.uc';
import RemoveEntityUseCase from '../business/useCases/manageEntities/removeEntity.uc';
import SaveEntityUseCase from '../business/useCases/manageEntities/saveEntity.uc';

export default function embedEntityController(controller, EntityType, useCases) {
  if (!useCases) {
    useCases = {};
    useCases.ShowEntityUseCase = new ShowEntityUseCase(EntityType);
    useCases.ListEntitiesUseCase = new ListEntitiesUseCase(EntityType);
    useCases.RemoveEntityUseCase = new RemoveEntityUseCase(EntityType);
    useCases.SaveEntityUseCase = new SaveEntityUseCase(EntityType);
  }

  controller.ShowEntityUseCase = useCases.ShowEntityUseCase;
  controller.ListEntitiesUseCase = useCases.ListEntitiesUseCase;
  controller.RemoveEntityUseCase = useCases.RemoveEntityUseCase;
  controller.SaveEntityUseCase = useCases.SaveEntityUseCase;

  controller.show = function (req) {
    const id = req.params.id;
    return controller.ShowEntityUseCase.execute(id);
  };

  controller.list = function (req) {
    const filter = req.query.filter;
    const options = req.query.options;

    return controller.ListEntitiesUseCase.execute(filter, options);
  };

  controller.remove = function (req) {
    const id = req.params.id;

    return controller.RemoveEntityUseCase.execute(id);
  };

  controller.create = function (req) {
    const entity = req.body;

    return controller.SaveEntityUseCase.execute(entity);
  };

  controller.update = function (req) {
    const id = req.params.id;
    const entity = req.body;
    entity.id = id;

    return controller.SaveEntityUseCase.execute(entity);
  };
}
