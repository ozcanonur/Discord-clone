const { Server } = require('./db/models/server');

const userExists = (users, newUser) => {
  const existingUser = users.filter((user) => user === newUser);
  if (existingUser.length > 0) return true;
  return false;
};

const findUserByUsername = (users, username) => {
  return users.find((user) => user.username === username);
};

const setupDefaultServer = async () => {
  let defaultServer = await Server.findOne({ name: 'Def' });
  if (!defaultServer) {
    defaultServer = new Server({
      name: 'Def',
      channels: [
        { name: 'general', messages: [] },
        { name: 'games', messages: [] },
        { name: 'covid-19', messages: [] },
      ],
      users: [],
    });
    await defaultServer.save();
  }
};

module.exports = { userExists, findUserByUsername, setupDefaultServer };
