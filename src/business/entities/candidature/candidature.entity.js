import joi from 'joi';
import Speck from 'speck-entity';

import joiSchemaToPropType from '../../../components/joi-schema-to-prop-type';
import activeRecord from '../../../components/active-record';
import CandidatureRepository from '../../repositories/candidature.repository';
import CandidatureCollection from './candidature.collection';

export default class Candidature extends Speck {

  static SCHEMA = joiSchemaToPropType({
    candidatureType: joi.string().valid([ 'P', 'V' ]).required(),
    description: joi.string().required(),
    electionYear: joi.number().integer(),
    region: join.string().required()
  });

  constructor(data) {
    super(data);

    activeRecord(
      this,
      new CandidatureRepository(),
      Candidature,
      CandidatureCollection
    );
  }
}
