import Speck from 'speck-entity';
import Image from './image.entity';

export default class ImageCollection extends Speck.SpeckCollection {
  static entity = Image;

  fetch() {
    return this.items.map(item => item.fetch());
  }
}
