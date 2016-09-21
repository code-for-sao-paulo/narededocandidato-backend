import joi from 'joi';
import Speck from 'speck-entity';

import joiSchemaToPropType from '../../../components/joi-schema-to-prop-type';
import activeRecord from '../../../components/active-record';
import CandidateLinkRepository from '../../repositories/candidateLink.repository';
import CandidateLinkCollection from './candidateLink.collection';

export default class CandidateLink extends Speck {

  static SCHEMA = joiSchemaToPropType({
    link: joi.string().uri().required()
  });

  constructor(data) {
    super(data);

    activeRecord(
      this,
      new CandidateLinkRepository(),
      CandidateLink,
      CandidateLinkCollection
    );
  }
}
