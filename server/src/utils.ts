import User, { IUser } from './db/models/user';
import Channel, { IChannel } from './db/models/channel';
import Server, { IServer } from './db/models/server';

export interface SearchResult {
  name: string;
  server: string;
  type: string;
  id: string;
}

const setupChannel = async (name: string, isVoice: boolean) => {
  const channel = new Channel({
    name,
    messages: [],
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
    const createdChannel: IChannel = await setupChannel(channel.name, channel.isVoice);
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
  const serverExists: boolean = await Server.exists({ name });
  if (serverExists) return;

  console.log(`Setting up ${name}`);

  const createdChannels: IChannel[] = await setupChannels(channels);
  const server = new Server({
    name,
    channels: createdChannels,
    users: [],
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

export const searchUsers = async (text: string, name: string) => {
  // Letting the user search for EVERY USER, not only friends
  // This is questionable.
  let regex;
  // Search for all users if no text after @
  if (text.length === 0) regex = new RegExp('.*');
  else regex = new RegExp(`^${text}`, 'i');

  const users: IUser[] = await User.find({ name: { $regex: regex } }).limit(20);
  const results: SearchResult[] = [];
  for (let user of users) {
    // Don't add the requesting user
    if (user.name !== name) results.push({ name: user.name, server: '', type: '@', id: user._id });
  }

  return results;
};

export const searchChannels = async (text: string, name: string) => {
  let regex;
  // Search for all channels if no text after #
  if (text.length === 0) regex = new RegExp('.*');
  else regex = new RegExp(`^${text}`, 'i');

  const channels: IChannel[] = await Channel.find({ name: { $regex: regex } }).limit(20);

  const results: SearchResult[] = [];
  for (let channel of channels) {
    // Skip _private because it's reserved for private messaging channels
    if (channel.name.includes('_private')) continue;
    // Find the channel's server
    const server: IServer = await Server.findOne({ channels: { $all: [channel._id] } });
    // Find the user and check if the user is subscribed to this server
    const user: IUser = await User.findOne({ name }).populate('servers');
    const isSubscribed = user.servers.some(
      (s: IServer) => s._id.toString() === server._id.toString()
    );
    if (isSubscribed)
      results.push({ name: channel.name, server: server.name, type: '#', id: channel._id });
  }

  return results;
};
