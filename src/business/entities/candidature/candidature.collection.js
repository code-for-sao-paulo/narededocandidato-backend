import Speck from 'speck-entity';
import Candidature from './candidature.entity';

export default class CandidatureCollection extends Speck.SpeckCollection {
  static entity = Candidature;

  fetch() {
    return this.items.map(item => item.fetch());
  }
}
