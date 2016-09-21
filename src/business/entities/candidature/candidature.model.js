import mongoose from 'mongoose';
import restrictDelete from '../../../components/database/restrict-delete';
import timestamp from '../../../components/database/timestamp';

const candidatureSchema = new mongoose.Schema({
  candidatureType: {
    type: String,
    required: true,
    enum: [ 'P', 'V' ]
  },
  description: {
    type: String,
    required: true
  },
  electionYear: {
    type: Number
  },
  region: {
    type: String,
    required: true
  }
});

candidateSchema.plugin(restrictDelete([ 'Candidate' ]));

candidatureSchema.plugin(timestamp);

export default mongoose.model('Candidature', candidatureSchema);
