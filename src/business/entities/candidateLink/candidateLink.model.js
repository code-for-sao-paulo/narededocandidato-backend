import mongoose from 'mongoose';
import restrictDelete from '../../../components/database/restrict-delete';
import timestamp from '../../../components/database/timestamp';
import checkRelationshipValidator from '../../../components/database/check-relationship-validator';

const candidateLinkSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
    validate: checkRelationshipValidator('Candidate')
  },
  link: {
    type: String,
    required: true
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Type',
    required: true,
    validate: checkRelationshipValidator('Type')
  },
});

candidateLinkSchema.plugin(restrictDelete([ 'Candidate', 'LinkType' ]));

candidateLinkSchema.plugin(timestamp);

export default mongoose.model('CandidateLink', candidateLinkSchema);
