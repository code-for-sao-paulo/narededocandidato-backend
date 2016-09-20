import ExtendableError from './extendable-error';

export default class InvalidRecordError extends ExtendableError {
  constructor(recordType, record) {
    super(`A ${recordType} record is invalid. Validation errors: ${JSON.stringify(record.errors)}`);
  }
}
