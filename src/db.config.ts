export default {
  db: process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/otus-graphql-prod',
  db_dev: process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/otus-graphql-dev',
};
