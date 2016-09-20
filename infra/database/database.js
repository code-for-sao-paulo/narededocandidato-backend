import Settings from '../settings';

let started = false;

export default function startDatabase() {
  if (started) {
    return;
  }

  const connectionString = Settings.database.connectionString;

  // add logic to start mongo

  started = true;
}
