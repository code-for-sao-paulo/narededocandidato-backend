import Speck from 'speck-entity';
import CandidateLink from './candidateLink.entity';

export default class CandidateLinkCollection extends Speck.SpeckCollection {
  static entity = CandidateLink;

  fetch() {
    return this.items.map(item => item.fetch());
  }
}
