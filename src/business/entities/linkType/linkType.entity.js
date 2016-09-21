import joi from 'joi';
import Speck from 'speck-entity';

import joiSchemaToPropType from '../../../components/joi-schema-to-prop-type';
import activeRecord from '../../../components/active-record';
import LinkTypeRepository from '../../repositories/linkType.repository';
import LinkTypeCollection from './linkType.collection';

export default class LinkType extends Speck {

  static SCHEMA = joiSchemaToPropType({
    name: joi.string().required(),
    description: joi.string().required()
  });

  constructor(data) {
    super(data);

    activeRecord(
      this,
      new LinkTypeRepository(),
      LinkType,
      LinkTypeCollection
    );
  }
}
