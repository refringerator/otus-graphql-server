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
        PORT: '4007',
        MODE: 'production',
      },
      env_production: {
        PORT: '4007',
        MODE: 'production',
      },
    },
  ],
};
