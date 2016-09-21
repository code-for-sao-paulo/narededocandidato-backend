import entityRepository from '../../components/entity-repository';
import getDatabase from '../../infra/database/database'

export default class CandidateRepository {
  constructor() {
    const database = getDatabase();

    entityRepository(
      this,
      database.Candidate
    );
  }
}
