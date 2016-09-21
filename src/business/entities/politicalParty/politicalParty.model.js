import mongoose from 'mongoose';
import restrictDelete from '../../../components/database/restrict-delete';
import timestamp from '../../../components/database/timestamp';

const politicalPartySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tseIdentity: {
    type: Number,
    required: true
  }
});

politicalPartySchema.plugin(restrictDelete([ 'Candidate' ]));

politicalPartySchema.plugin(timestamp);

export default mongoose.model('PoliticalParty', politicalPartySchema);
