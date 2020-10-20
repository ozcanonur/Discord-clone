import { Socket } from 'socket.io';
import User from '../db/models/user';
import Server from '../db/models/server';
import Channel from '../db/models/channel';
import Message from '../db/models/message';

import { findUsersSubscribedToServer, findChannelByIdAndPopulateMessages } from '../utils/dbUtils';
import { getCreateChannelValidationError } from '../utils/validation';
import {
  emitServers,
  removeIfVoiceAndEmitServers,
  emitPinNotification,
  emitPinnedMessages,
} from '../utils/emit';
import { reduceMessages } from '../utils/reduce';

export const onUserCreatedChannel = async (
  io: SocketIO.Server,
  socket: Socket,
  action: CreateChannelIOAction
) => {
  const { server, channelName, isVoice } = action.payload;

  // Validate
  const validationError: string | undefined = await getCreateChannelValidationError(
    server,
    channelName
  );
  if (validationError)
    return socket.emit('action', { type: 'io/response', payload: { error: validationError } });

  // Create and save channel
  const channel = new Channel({
    name: channelName,
    voice: isVoice,
  });
  await channel.save();

  // Add the channel to its server
  await Server.updateOne({ _id: server._id }, { $addToSet: { channels: channel } });

  // Find the users which are subscribed to this server
  const channelsServer = await Server.findOne({ _id: server._id });
  const users = await findUsersSubscribedToServer(channelsServer);
  // Send the updated servers to all of them
  emitServers(io, users);
  // Emit success
  socket.emit('action', { type: 'io/response' });
};

export const onUserDeletedChannel = async (
  io: SocketIO.Server,
  socket: Socket,
  action: DeleteChannelIOAction
) => {
  const { channelId } = action.payload;

  // Find the user
  const user = await User.findOne({ socketId: socket.id });
  // Find the server that this channel is on
  // @ts-ignore, WOOP
  const server = await Server.findOne({ channels: { _id: channelId } });
  // Check if the user is admin in this server, also if they are default servers
  const isDefaultServers = server.name === 'Default' || server.name === 'Games';
  if (isDefaultServers || server.admin._id.toString() !== user._id.toString()) return;

  // Remove the channel from the server
  server.channels = server.channels.filter((ch) => ch._id.toString() !== channelId);
  await server.save();

  // Remove the channel, remnants (messages) will be taken care of by middleware
  // Using remove() to trigger middleware instead one liner
  const channel = await Channel.findOne({ _id: channelId });
  await channel.remove();

  // Find users that are subscribed to this server
  const users = await findUsersSubscribedToServer(server);
  // Emit the new server list containing new channels to everyone that is subscribed to this server
  emitServers(io, users);
};

export const onUserSelectedChannel = async (
  io: SocketIO.Server,
  socket: Socket,
  action: SelectChannelIOAction
) => {
  const { channel, isVoice } = action.payload;

  const user = await User.findOne({ socketId: socket.id }).populate('currentChannel');

  if (user.currentChannel) {
    // Leave the current channel first
    socket.leave(user.currentChannel._id.toString());
    // Remove the user from voiceUsers of the channel if present
    removeIfVoiceAndEmitServers(io, user);
  }

  // Join the new channel
  socket.join(channel._id.toString());

  // Find the new channel with its messages
  const newChannel = await findChannelByIdAndPopulateMessages(channel._id);

  // Update the user's current channel
  await User.updateOne({ socketId: socket.id }, { currentChannel: newChannel });

  if (isVoice) {
    // Add the user to the voiceUsers in the channel
    await Channel.updateOne({ _id: channel._id }, { $addToSet: { voiceUsers: user } });

    // Find the server this channel is on
    // @ts-ignore, WOOP
    const server = await Server.findOne({ channels: { _id: channel._id } });
    // Find users that are subscribed to this server
    const users = await findUsersSubscribedToServer(server);
    // Emit the new server list containing new channels to everyone that is subscribed to this server
    emitServers(io, users);
  } else {
    // Emit the older messages to client
    socket.emit('action', { type: 'io/messages', payload: reduceMessages(newChannel.messages) });

    // Emit the pins also
    emitPinnedMessages(socket, undefined, newChannel.pinnedMessages, undefined);
  }
};

export const onUserCreatedPin = async (io: SocketIO.Server, action: CreatePinIOAction) => {
  const { message, selectedChannel } = action.payload;

  // Find the user
  const user = await User.findOne({ name: message.username });

  // Create and save the message
  const newPinMessage = new Message({
    user,
    message: message.message,
    createdAt: message.createdAt ? message.createdAt : new Date(),
  });
  await newPinMessage.save();

  // Find the channel
  const channel = await Channel.findOne({ _id: selectedChannel._id }).populate({
    path: 'pinnedMessages',
    model: 'Message',
    populate: {
      path: 'user',
      model: 'User',
    },
  });
  // Save the message in channel's pins
  channel.pinnedMessages.push(newPinMessage);
  await channel.save();

  // Find users that are currently in this channel
  const users = await User.find({ currentChannel: channel._id });

  // Send the pins to all of them
  emitPinnedMessages(undefined, io, channel.pinnedMessages, users);

  // Find the channel's server and send notification to all users subscribed to that server
  // @ts-ignore, WOOP
  const server = await Server.findOne({ channels: { _id: channel.id } }).populate('users');

  emitPinNotification(io, server.users, channel._id);
};
