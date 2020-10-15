import { IServer } from '../db/models/server';
import { IChannel } from '../db/models/channel';
import { IMessage } from '../db/models/message';
import { IUser } from '../db/models/user';

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
