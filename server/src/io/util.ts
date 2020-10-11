import Server, { IServer } from '../db/models/server';
import Channel, { IChannel } from '../db/models/channel';
import { IMessage } from '../db/models/message';
import { IUser } from '../db/models/user';

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

export const setupServer = async (
  name: string,
  channels: {
    name: string;
    isVoice: boolean;
  }[]
) => {
  const serverExists: boolean = await Server.exists({ name });
  if (serverExists) return;

  const createdChannels: IChannel[] = await setupChannels(channels);
  const server = new Server({
    name,
    channels: createdChannels,
    users: [],
  });
  await server.save();
};

export const reduceUsers = (users: IUser[]) => users.map((user) => user.name);

export const reduceServers = (servers: IServer[]) => {
  const reducedServers: {
    _id: any;
    name: string;
    channels: any;
  }[] = servers.map((server) => {
    const channels = server.channels.map((channel: IChannel) => {
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

export const reduceMessages = (messages: IMessage[]) => {
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

export const reducePrivateUsers = (user: IUser) => {
  const friendIds = user.friends.map((friend: IUser) => friend._id);
  return user.usersMessagedBefore.map((u: IUser) => {
    const isFriend = friendIds.includes(u._id);
    return {
      name: u.name,
      isFriend,
    };
  });
};

module.exports = { setupServer, reduceUsers, reduceServers, reduceMessages, reducePrivateUsers };
