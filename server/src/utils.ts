import User, { IUser } from './db/models/user';
import Channel, { IChannel } from './db/models/channel';
import Server, { IServer } from './db/models/server';

export interface SearchResult {
  name: string;
  server: string;
  type: string;
  id: string;
}

export const searchUsers = async (text: string, name: string) => {
  // Letting the user search for EVERY USER, not only friends
  // This is questionable.
  let regex;
  // Search for all users if no text after @
  if (text.length === 0) regex = new RegExp('.*');
  else regex = new RegExp(`^${text}`);

  const users: IUser[] = await User.find({ name: { $regex: regex } });
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
  else regex = new RegExp(`^${text}`);

  const channels: IChannel[] = await Channel.find({ name: { $regex: regex } });

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
