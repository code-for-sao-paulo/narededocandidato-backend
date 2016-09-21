import mongoose from 'mongoose';
import restrictDelete from '../../../components/database/restrict-delete';
import timestamp from '../../../components/database/timestamp';

const linkTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

linkTypeSchema.plugin(restrictDelete([ 'CandidateLink' ]));

linkTypeSchema.plugin(timestamp);

export default mongoose.model('LinkType', linkTypeSchema);
