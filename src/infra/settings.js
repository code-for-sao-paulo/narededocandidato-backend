import dotenv from 'dotenv';

dotenv.config({ silent: true });

const Settings = {
  web: {
    httpPort: process.env.WEB_HTTP_PORT || 3000
  },
  database: {
    connectionString: process.env.DATABASE_CONNECTION_STRING || ''
  }
};

export default Settings;
