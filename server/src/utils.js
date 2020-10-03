const User = require('./db/models/user');
const Channel = require('./db/models/channel');
const Server = require('./db/models/server');

const searchUsers = async (text, name) => {
  // Letting the user search for EVERY USER, not only friends
  // This is questionable.
  let regex;
  // Search for all users if no text after @
  if (text.length === 0) regex = new RegExp('.*');
  else regex = new RegExp(`^${text}`);

  const users = await User.find({ name: { $regex: regex } });

  const results = [];
  for (let user of users) {
    // Don't add the requesting user
    if (user.name !== name) results.push({ name: user.name, server: '', type: '@', id: user._id });
  }

  return results;
};

const searchChannels = async (text, name) => {
  let regex;
  // Search for all channels if no text after #
  if (text.length === 0) regex = new RegExp('.*');
  else regex = new RegExp(`^${text}`);

  const channels = await Channel.find({ name: { $regex: regex } });

  const results = [];
  for (let channel of channels) {
    // Skip _private because it's reserved for private messaging channels
    if (channel.name.includes('_private')) continue;
    // Find the channel's server
    const server = await Server.findOne({ channels: { $all: [channel._id] } });
    // Find the user and check if the user is subscribed to this server
    const user = await User.findOne({ name }).populate('servers');
    const isSubscribed = user.servers.some((s) => s._id.toString() === server._id.toString());
    if (isSubscribed)
      results.push({ name: channel.name, server: server.name, type: '#', id: channel._id });
  }

  return results;
};

module.exports = { searchUsers, searchChannels };
