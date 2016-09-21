import Speck from 'speck-entity';
import Candidate from './candidate.entity';

export default class CandidateCollection extends Speck.SpeckCollection {
  static entity = Candidate;

  fetch() {
    return this.items.map(item => item.fetch());
  }
}
