const { connect, connection } = require('mongoose');
require('dotenv').config({ path: require('find-config')('.env') });


const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/mongoIsSocialDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;