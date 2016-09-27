import Settings from '../settings';
import mongoose from 'mongoose';

let started = false;

export default function startDatabase() {
  if (started) {
    return;
  }

  const connectionString = Settings.database.connectionString;

  mongoose.connect(connectionString);

  started = true;

  return
}
