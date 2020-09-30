const Server = require('./db/models/server');
const Channel = require('./db/models/channel');

const defaultChannel = async (name, voice) => {
  const channel = new Channel({
    name,
    messages: [],
    voice,
  });

  await channel.save();
  return channel;
};

const setupDefaultChannels = async () => {
  const channels = await Promise.all([
    defaultChannel('general'),
    defaultChannel('games'),
    defaultChannel('covid-19'),
    defaultChannel('voice', true),
  ]);
  return channels;
};

const setupDefaultServer = async () => {
  const defaultServerExists = await Server.exists({ name: 'Def' });
  if (!defaultServerExists) {
    const defaultChannels = await setupDefaultChannels();
    const defaultServer = new Server({
      name: 'Def',
      channels: defaultChannels,
      users: [],
    });
    await defaultServer.save();
  }
};

module.exports = { setupDefaultServer };
