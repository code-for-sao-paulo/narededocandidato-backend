import Speck from 'speck-entity';
import PoliticalParty from './politicalParty.entity';

export default class PoliticalPartyCollection extends Speck.SpeckCollection {
  static entity = PoliticalParty;

  fetch() {
    return this.items.map(item => item.fetch());
  }
}
