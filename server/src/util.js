const { Server } = require('./db/models/server');

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

module.exports = { setupDefaultServer };
