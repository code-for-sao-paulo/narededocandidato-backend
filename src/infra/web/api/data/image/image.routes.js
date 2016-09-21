import generateEntityRoutes from '../../../../../components/entity-controller-routes';
import ImageController from './image.controller';

const controller = new ImageController();

export default function (app) {
  return generateEntityRoutes(app, controller, '/api/data/image');
}
