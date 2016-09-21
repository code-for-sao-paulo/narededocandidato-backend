import entityRepository from '../../components/entity-repository';
import getDatabase from '../../infra/database/database'

export default class PoliticalPartyRepository {
  constructor() {
    const database = getDatabase();

    entityRepository(
      this,
      database.PoliticalParty
    );
  }
}
