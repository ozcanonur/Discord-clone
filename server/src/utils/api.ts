import User from '../db/models/user';
import Channel, { IChannel } from '../db/models/channel';
import Server from '../db/models/server';

const setupChannel = async (name: string, isVoice: boolean) => {
  const channel = new Channel({
    name,
    voice: isVoice,
  });

  await channel.save();
  return channel;
};

const setupChannels = async (
  channels: {
    name: string;
    isVoice: boolean;
  }[]
) => {
  const createdChannels: IChannel[] = [];
  for (const channel of channels) {
    const createdChannel = await setupChannel(channel.name, channel.isVoice);
    createdChannels.push(createdChannel);
  }

  return createdChannels;
};

const setupServer = async (
  name: string,
  channels: {
    name: string;
    isVoice: boolean;
  }[]
) => {
  if (await Server.exists({ name })) return;

  const createdChannels = await setupChannels(channels);
  const server = new Server({
    name,
    channels: createdChannels,
  });
  await server.save();
};

export const setupDefaultServers = async () => {
  await setupServer('Default', [
    { name: 'General', isVoice: false },
    { name: 'World news', isVoice: false },
    { name: 'Covid-19', isVoice: false },
    { name: 'Voice', isVoice: true },
  ]);
  await setupServer('Games', [
    { name: 'General', isVoice: false },
    { name: 'World of Warcraft', isVoice: false },
    { name: 'Path of Exile', isVoice: false },
    { name: 'Voice', isVoice: true },
  ]);
};

export interface SearchResult {
  name: string;
  server: string;
  type: string;
  id: string;
}

export const searchUsers = async (text: string, name: string) => {
  const searchRegex = text.length === 0 ? new RegExp('.*') : new RegExp(`^${text}`, 'i');

  const users = await User.find({ $and: [{ name: { $regex: searchRegex, $ne: name } }] }).limit(20);

  return users.map((user) => {
    return { name: user.name, server: '', type: '@', id: user._id };
  });
};

export const searchChannels = async (text: string, name: string) => {
  // Search for all channels if no text after #
  const searchRegex = text.length === 0 ? new RegExp('.*') : new RegExp(`^${text}`, 'i');

  const channels = await Channel.find({ name: { $regex: searchRegex } }).limit(20);

  const results: SearchResult[] = [];
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
