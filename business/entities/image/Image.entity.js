import joi from 'joi';
import Speck from 'speck-entity';

import joiSchemaToPropType from '../../../components/joi-schema-to-prop-type';
import activeRecord from '../../../components/active-record';
import ImageRepository from '../../repositories/image.repository';
import ImageCollection from './image.collection';

export default class Image extends Speck {

  static SCHEMA = joiSchemaToPropType({
    content: joi.binary().required(),
    mediaType: joi.string().required()
  });

  constructor(data) {
    super(data);

    activeRecord(
      this,
      new ImageRepository(),
      Image,
      ImageCollection
    );
  }
}
