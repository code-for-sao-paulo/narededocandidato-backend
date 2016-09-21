import entityRepository from '../../components/entity-repository';
import getDatabase from '../../infra/database/database'

export default class LinkTypeRepository {
  constructor() {
    const database = getDatabase();

    entityRepository(
      this,
      database.LinkType
    );
  }
}
