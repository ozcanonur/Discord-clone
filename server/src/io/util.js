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

const reduceUsers = (users) => users.map((user) => user.name);

const reduceServers = (servers) => {
  const reducedServers = servers.map((server) => {
    const channels = server.channels.map((channel) => {
      return {
        _id: channel._id,
        name: channel.name,
        voice: channel.voice,
      };
    });
    return {
      _id: server._id,
      name: server.name,
      channels,
    };
  });

  return reducedServers;
};

const reduceFriends = (friends) => friends.map((friend) => friend.name);

const reduceMessages = (messages) => {
  const reducedMessages = messages.map((message) => {
    const username = message.user.name;
    return {
      _id: message._id,
      username,
      message: message.message,
      createdAt: message.createdAt,
    };
  });

  return reducedMessages;
};

module.exports = { setupServer, reduceUsers, reduceServers, reduceFriends, reduceMessages };
