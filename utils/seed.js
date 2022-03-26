const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { users } = require('./data');

connection.on('error', err => err)

connection.once('open', async () => {
    await Thought.deleteMany({});
    await User.deleteMany({});
    await connection.close();

    console.info('Seeding complete! 🌱');
    // process.exit(0);
});