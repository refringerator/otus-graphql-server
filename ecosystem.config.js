// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'app',
      script: 'build/app.js',
      env: {
        PORT: '80',
        MODE: 'development',
      },
      env_test: {
        PORT: '80',
        MODE: 'test',
      },
      env_stage: {
        PORT: '80',
        MODE: 'production',
      },
      env_production: {
        PORT: process.env.PORT,
        MODE: 'production',
        MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
      },
    },
  ],
};
