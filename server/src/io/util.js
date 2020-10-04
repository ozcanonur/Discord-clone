const Server = require('../db/models/server');
const Channel = require('../db/models/channel');

const setupChannel = async (name, isVoice) => {
  const channel = new Channel({
    name,
    messages: [],
    voice: isVoice,
  });

  await channel.save();
  return channel;
};

const setupChannels = async (channels) => {
  const createdChannels = [];
  for (const channel of channels) {
    const createdChannel = await setupChannel(channel.name, channel.isVoice);
    createdChannels.push(createdChannel);
  }

  return createdChannels;
};

const setupServer = async (name, channels) => {
  const serverExists = await Server.exists({ name });
  if (serverExists) return;

  const createdChannels = (channels = await setupChannels(channels));
  const server = new Server({
    name,
    channels: createdChannels,
    users: [],
  });
  await server.save();
};

module.exports = { setupServer };
