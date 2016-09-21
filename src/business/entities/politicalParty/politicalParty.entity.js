import joi from 'joi';
import Speck from 'speck-entity';

import joiSchemaToPropType from '../../../components/joi-schema-to-prop-type';
import activeRecord from '../../../components/active-record';
import PoliticalPartyRepository from '../../repositories/politicalParty.repository';
import PoliticalPartyCollection from './politicalParty.collection';

export default class PoliticalParty extends Speck {

  static SCHEMA = joiSchemaToPropType({
    name: joi.string().required(),
    tseIdentity: joi.number().integer().required()
  });

  constructor(data) {
    super(data);

    activeRecord(
      this,
      new PoliticalPartyRepository(),
      PoliticalParty,
      PoliticalPartyCollection
    );
  }
}
