import mongoose from 'mongoose';
import timestamp from '../../../components/database/timestamp';
import checkRelationshipValidator from '../../../components/database/check-relationship-validator';

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  party: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PoliticalParty',
    required: true,
    validate: checkRelationshipValidator('PoliticalParty')
  },
  candidature: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidature',
    required: true,
    validate: checkRelationshipValidator('Candidature')
  }
});

candidateSchema.plugin(timestamp);

export default mongoose.model('Candidate', candidateSchema);
