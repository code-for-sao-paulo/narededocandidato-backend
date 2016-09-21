import joi from 'joi';
import Speck from 'speck-entity';

import joiSchemaToPropType from '../../../components/joi-schema-to-prop-type';
import activeRecord from '../../../components/active-record';
import CandidateRepository from '../../repositories/candidate.repository';
import CandidateCollection from './candidate.collection';

export default class Candidate extends Speck {

  static SCHEMA = joiSchemaToPropType({
    name: joi.string().required()
  });

  constructor(data) {
    super(data);

    activeRecord(
      this,
      new CandidateRepository(),
      Candidate,
      CandidateCollection
    );
  }
}
