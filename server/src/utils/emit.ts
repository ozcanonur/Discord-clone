import Channel, { IChannel } from '../db/models/channel';
import Server from '../db/models/server';
import { IMessage } from '../db/models/message';
import User, { IUser } from '../db/models/user';
import { reduceServers, reduceMessages, reduceUsers, reducePrivateUsers } from './reduce';
import { findUsersSubscribedToServer } from './dbUtils';
import { Socket } from 'socket.io';

export const emitActiveUsers = async (io: SocketIO.Server) => {
  const users = await User.find({ online: true });
  io.emit('action', { type: 'io/activeUsers', payload: reduceUsers(users) });
};

export const emitServers = (io: SocketIO.Server, users: IUser[]) => {
  users.forEach((user) => {
    io.to(user.socketId).emit('action', {
      type: 'io/servers',
      payload: reduceServers(user.servers),
    });
  });
};

export const emitPinnedMessages = (
  socket: Socket | undefined,
  io: SocketIO.Server | undefined,
  pinnedMessages: IMessage[],
  users: IUser[] | undefined
) => {
  const sortedPinnedMessages = pinnedMessages.sort((x: any, y: any) => y.createdAt - x.createdAt);

  if (socket) {
    socket.emit('action', {
      type: 'io/pinnedMessages',
      payload: reduceMessages(sortedPinnedMessages),
    });
  } else {
    users.forEach((user) => {
      io.to(user.socketId).emit('action', {
        type: 'io/pinnedMessages',
        payload: reduceMessages(sortedPinnedMessages),
      });
    });
  }
};

export const emitPinNotification = (io: SocketIO.Server, users: IUser[], channelId: string) => {
  users.forEach((user) => {
    io.to(user.socketId).emit('action', {
      type: 'io/notification',
      payload: { type: 'pin', channelId },
    });
  });
};

export const emitPrivateMessageNotification = async (io: SocketIO.Server, user: IUser) => {
  const recipientName = user.currentChannel.name.replace(user.name, '').replace('_private', '');
  // Find the recipient's socketId
  const recipient = await User.findOne({ name: recipientName }).populate('usersMessagedBefore');
  // Emit to the recipient that a message is received
  io.to(recipient.socketId).emit('action', {
    type: 'io/notification',
    payload: { type: 'private', from: user.name },
  });
  // Also emit the new private user list
  io.to(recipient.socketId).emit('action', {
    type: 'io/privateUsers',
    payload: reducePrivateUsers(recipient.friends, recipient.usersMessagedBefore),
  });
};

export const emitMessagesToChannel = (io: SocketIO.Server, channel: IChannel) => {
  io.to(channel._id.toString()).emit('action', {
    type: 'io/messages',
    payload: reduceMessages(channel.messages),
  });
};

export const removeIfVoiceAndEmitServers = async (io: SocketIO.Server, user: IUser) => {
  const oldChannel = await Channel.findOne({ _id: user.currentChannel._id }).populate('voiceUsers');
  const wasOnVoice = oldChannel.voiceUsers.some((u) => u._id.toString() === user._id.toString());
  if (wasOnVoice) {
    oldChannel.voiceUsers = oldChannel.voiceUsers.filter(
      (u) => u._id.toString() !== user._id.toString()
    );
    await oldChannel.save();

    // Find the server that this channel is on
    // @ts-ignore, WOOP
    const server = await Server.findOne({ channels: { _id: oldChannel._id } });
    // Find the users that are subscribed to this server
    const users = await findUsersSubscribedToServer(server);
    // Emit the new server list containing new channels to everyone that is subscribed to this server
    emitServers(io, users);
  }
};

export const emitPrivateUsers = (
  io: SocketIO.Server | undefined,
  socket: Socket | undefined,
  user: IUser
) => {
  if (socket) {
    socket.emit('action', {
      type: 'io/privateUsers',
      payload: reducePrivateUsers(user.friends, user.usersMessagedBefore),
    });
  } else {
    io.to(user.socketId).emit('action', {
      type: 'io/privateUsers',
      payload: reducePrivateUsers(user.friends, user.usersMessagedBefore),
    });
  }
};
