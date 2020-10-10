import User, { IUser } from '../db/models/user';
import Channel from '../db/models/channel';
import Message, { IMessage } from '../db/models/message';
import Server from '../db/models/server';
import { reduceMessages } from './util';

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
  const server = await Server.findOne({ channels: { $all: [channel.id] } }).populate('users');
  server.users.forEach((user: IUser) => {
    io.to(user.socketId).emit('action', {
      type: 'io/notification',
      payload: { type: 'pin', channelId: channel._id },
    });
  });
};
