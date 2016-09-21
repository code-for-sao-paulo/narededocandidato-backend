import Speck from 'speck-entity';
import LinkType from './linkType.entity';

export default class LinkTypeCollection extends Speck.SpeckCollection {
  static entity = LinkType;

  fetch() {
    return this.items.map(item => item.fetch());
  }
}
