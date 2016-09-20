import entityController from '../../../../../components/entity-controller';
import Image from '../../../../../business/entities/image/image.entity';

export default class ImageController {
  constructor() {
    entityController(
      this,
      Image
    );
  }
}
