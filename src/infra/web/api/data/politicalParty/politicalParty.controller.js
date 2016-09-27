import entityController from '../../../../../components/entity-controller';
import PoliticalParty from '../../../../../business/entities/politicalParty/politicalParty.entity';

export default class PoliticalPartyController {
  constructor() {
    entityController(
      this,
      PoliticalParty
    );
  }
}
