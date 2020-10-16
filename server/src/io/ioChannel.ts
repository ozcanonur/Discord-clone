import { Socket } from 'socket.io';
import User, { IUser } from '../db/models/user';
import Server from '../db/models/server';
import Channel, { IChannel } from '../db/models/channel';
import Message, { IMessage } from '../db/models/message';
import { reduceServers, reduceMessages, reduceServer } from './utils';

const getCreateChannelValidationError = async (
  server: { _id: string; name: string; channels: any },
  channelName: string
) => {
  if (channelName.length > 10) return `Channel name can't be longer than 10 characters.`;
  else if (channelName.length === 0) return `Channel name can't be empty.`;
  else {
    // Check if the server has the channel already
    let found = false;
    for (let i = 0; i < server.channels.length; i++) {
      if (server.channels[i].name === channelName) {
        found = true;
        break;
      }
    }
    if (found) return `Channel already exists in ${server.name}.`;
  }
};

export const onUserCreatedChannel = async (
  io: SocketIO.Server,
  socket: Socket,
  action: {
    type: string;
    payload: {
      server: { _id: string; name: string; channels: any };
      channelName: string;
      isVoice: boolean;
    };
  }
) => {
  const { server, channelName, isVoice } = action.payload;
  // Validate
  const validationError: string | undefined = await getCreateChannelValidationError(
    server,
    channelName
  );
  if (validationError) {
    socket.emit('action', { type: 'io/response', payload: { error: validationError } });
    return;
  }

  // Create and save channel
  const channel = new Channel({
    name: channelName,
    messages: [],
    voice: isVoice,
  });
  await channel.save();

  // Add the channel to its server
  // @ts-ignore
  await Server.updateOne({ _id: server._id }, { $addToSet: { channels: channel } });
  // Find the users which are subscribed to this server
  const channelsServer = await Server.findOne({ _id: server._id })
    .populate('users')
    .populate('channels');

  const userIds: string[] = channelsServer.users.map((u) => u._id);
  const users = await User.find({ _id: { $in: userIds } }).populate({
    path: 'servers',
    model: 'Server',
    populate: {
      path: 'channels',
      model: 'Channel',
    },
  });
  // Send the updated servers to each of them
  users.forEach((user) => {
    const { socketId, servers } = user;
    io.to(socketId).emit('action', {
      type: 'io/selectedServer',
      payload: reduceServer(channelsServer),
    });
    io.to(socketId).emit('action', { type: 'io/servers', payload: reduceServers(servers) });
  });
};

export const onUserDeletedChannel = async (
  io: SocketIO.Server,
  action: { type: string; payload: { name: string; channelId: string } }
) => {
  const { name, channelId } = action.payload;

  // Check if the user is admin in this server, also if they are default servers
  let server = await Server.findOne({ channels: { $all: channelId } }).populate('admin');
  const isDefaultServers = server.name === 'Default' || server.name === 'Games';
  if (isDefaultServers || server.admin.name !== name) return;

  // Remove the channel from the server
  server.channels = server.channels.filter((ch: IChannel) => ch._id.toString() !== channelId);
  await server.save();
  // Remove the channel, remnants will be taken care of by middleware
  const channel = await Channel.findOne({ _id: channelId });
  await channel.remove();

  const users = await User.find({ _id: { $in: server.users } }).populate({
    path: 'servers',
    model: 'Server',
    populate: {
      path: 'channels',
      model: 'Channel',
    },
  });
  server = await Server.findOne({ channels: { $all: channelId } });
  // Emit the new server list containing new channels to everyone that was subscribed to this server
  // Emit the new server list to everyone that was subscribed to this server
  users.forEach((user) => {
    io.to(user.socketId).emit('action', {
      type: 'io/servers',
      payload: reduceServers(user.servers),
    });
    io.to(user.socketId).emit('action', {
      type: 'io/selectedServer',
      payload: reduceServer(server),
    });
  });
};

export const onUserSelectedChannel = async (
  socket: Socket,
  action: {
    type: string;
    payload: {
      name: string;
      channel: {
        _id: string;
        name: string;
        voice: boolean;
      };
    };
  }
) => {
  const { name, channel } = action.payload;
  // Leave the current channel first
  const user = await User.findOne({ name }).populate('currentChannel');
  if (user.currentChannel) await socket.leave(user.currentChannel._id.toString());
  // Join the new channel
  await socket.join(channel._id.toString());
  // Find the older messages in the channel
  const currChannel = await Channel.findOne({ _id: channel._id }).populate([
    {
      path: 'messages',
      model: 'Message',
      populate: {
        path: 'user',
        model: 'User',
      },
    },
    {
      path: 'pinnedMessages',
      model: 'Message',
      populate: {
        path: 'user',
        model: 'User',
      },
    },
  ]);
  // Update the user's current channel
  await User.updateOne({ name }, { currentChannel: currChannel });

  // Emit the older messages to client
  socket.emit('action', { type: 'io/messages', payload: reduceMessages(currChannel.messages) });
  // Emit the pins also, Sort by date first
  const sortedPinnedMessages: IMessage[] = currChannel.pinnedMessages.sort(
    (x: any, y: any) => y.createdAt - x.createdAt
  );
  socket.emit('action', {
    type: 'io/pinnedMessages',
    payload: reduceMessages(sortedPinnedMessages),
  });
};

export const onUserCreatedPin = async (
  io: SocketIO.Server,
  action: {
    type: string;
    payload: {
      name: string;
      message: string;
      selectedChannel: {
        _id: string;
        name: string;
        voice: boolean;
      };
    };
  }
) => {
  const { name, message, selectedChannel } = action.payload;
  // Find which user
  const user = await User.findOne({ name });
  // Create and save the message
  const newPinMessage = new Message({
    user,
    message,
    createdAt: new Date(),
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
  // Send all the pins to each of them
  // Sort by date first
  const sortedPinnedMessages: IMessage[] = channel.pinnedMessages.sort(
    (x: any, y: any) => y.createdAt - x.createdAt
  );
  users.forEach((user) => {
    io.to(user.socketId).emit('action', {
      type: 'io/pinnedMessages',
      payload: reduceMessages(sortedPinnedMessages),
    });
  });
  // Find the channel's server, send notification to all users subscribed to that server
  // WOOP changed id to _id
  const server = await Server.findOne({ channels: { $all: [channel._id] } }).populate('users');
  server.users.forEach((user) => {
    io.to(user.socketId).emit('action', {
      type: 'io/notification',
      payload: { type: 'pin', channelId: channel._id },
    });
  });
};

export const onUserSelectedVoiceChannel = async (
  io: SocketIO.Server,
  socket: Socket,
  action: {
    type: string;
    payload: {
      name: string;
      channel: {
        _id: string;
        name: string;
        voice: boolean;
      };
    };
  }
) => {
  const { name, channel } = action.payload;

  // Leave current channel
  const user = await User.findOne({ name }).populate({
    path: 'currentChannel',
    model: 'Channel',
    populate: {
      path: 'voiceUsers',
      model: 'User',
    },
  });

  if (user.currentChannel) {
    await socket.leave(user.currentChannel._id.toString());
    // Remove the user from current channel's voiceUsers
    const currentChannel = await Channel.findOne({ _id: user.currentChannel._id });
    currentChannel.voiceUsers = currentChannel.voiceUsers.filter((u) => u.name !== name);
    await currentChannel.save();
  }

  // Join the voice channel
  await socket.join(channel._id.toString());

  // Update the user's current channel
  const newChannel = await Channel.findOne({ name: channel.name }).populate('voiceUsers');
  await User.updateOne({ name }, { currentChannel: newChannel });
  // Update the channel's voice users
  await Channel.updateOne({ name: channel.name }, { $addToSet: { voiceUsers: user } });

  // channel = {_id, name, voice, voiceUsers=[]}
  // // Find all the users subscribed to this channel
  const server = await Server.findOne({ channels: { $all: [channel._id] } }).populate({
    path: 'users',
    model: 'User',
    populate: {
      path: 'servers',
      model: 'Server',
      populate: {
        path: 'channels',
        model: 'Channel',
        populate: {
          path: 'voiceUsers',
          model: 'User',
        },
      },
    },
  });
  const usersSubscribed = server.users;
  // Find all the servers that each user is subscribed, and send them back
  for (let userSubscribed of usersSubscribed) {
    io.to(userSubscribed.socketId).emit('action', {
      type: 'io/servers',
      payload: reduceServers(userSubscribed.servers),
    });
  }
};
