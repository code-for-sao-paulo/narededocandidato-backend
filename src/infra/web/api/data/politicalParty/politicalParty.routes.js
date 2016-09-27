import generateEntityRoutes from '../../../../../components/entity-controller-routes';
import PoliticalPartyController from './politicalParty.controller';

const controller = new PoliticalPartyController();

export default function (app) {
  return generateEntityRoutes(app, controller, '/api/data/politicalParty');
}
