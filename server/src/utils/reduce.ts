import { IServer } from '../db/models/server';
import { IChannel } from '../db/models/channel';
import { IMessage } from '../db/models/message';
import { IUser } from '../db/models/user';

export const reduceUsers = (users: IUser[]) => users.map((user) => user.name);

const reduceUsersWithId = (users: IUser[]) =>
  users.map((user) => {
    return { name: user.name, _id: user._id };
  });

const reduceChannels = (channels: IChannel[]) =>
  channels.map((channel) => {
    return {
      _id: channel._id,
      name: channel.name,
      isVoice: channel.voice,
      voiceUsers: reduceUsersWithId(channel.voiceUsers),
    };
  });

export const reduceServers = (servers: IServer[]) =>
  servers.map((server) => {
    return {
      _id: server._id,
      name: server.name,
      channels: reduceChannels(server.channels),
      admin: server.admin,
    };
  });

export const reduceMessages = (messages: IMessage[]) =>
  messages.map((message) => {
    return {
      _id: message._id,
      username: message.user.name,
      message: message.message,
      createdAt: message.createdAt,
    };
  });

export const reducePrivateUsers = (friends: IUser[], usersMessagedBefore: IUser[]) =>
  usersMessagedBefore.map((user) => {
    return {
      name: user.name,
      isFriend: friends.some((friend) => friend._id.toString() === user._id.toString()),
    };
  });
