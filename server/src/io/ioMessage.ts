import User from '../db/models/user';
import Channel from '../db/models/channel';
import Message from '../db/models/message';
import { reduceMessages } from './util';

export const onUserMessaged = async (
  io: SocketIO.Server,
  action: {
    type: string;
    payload: {
      name: string;
      message: string;
    };
  }
) => {
  const { name, message } = action.payload;
  // Find the user
  const user = await User.findOne({ name }).populate('currentChannel');
  // Find the channel
  const channel = await Channel.findOne({ _id: user.currentChannel });
  // Create and save the message
  const newMessage = new Message({
    user,
    message,
    createdAt: new Date(),
  });
  await newMessage.save();
  // Save the message in channel also
  channel.messages.push(newMessage);
  await channel.save();

  // Find and re-populate the channel
  const currChannel = await Channel.findOne({ _id: channel._id }).populate({
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'user',
      model: 'User',
    },
  });

  // Send the messages in the channel back
  io.to(user.currentChannel._id.toString()).emit('action', {
    type: 'io/messages',
    payload: reduceMessages(currChannel.messages),
  });

  // Send a notification if it's a private message
  const channelName: string = user.currentChannel.name;
  if (channelName.includes('private')) {
    const recipientName = channelName.replace(name, '').replace('_private', '');
    // Find the recipient's socketId
    const recipient = await User.findOne({ name: recipientName });
    // Emit to the recipient that a message is received
    io.to(recipient.socketId).emit('action', {
      type: 'io/notification',
      payload: { type: 'private', from: name },
    });
  }
};

export const onUserDeletedMessage = async (
  io: SocketIO.Server,
  action: {
    type: string;
    payload: {
      name: string;
      message: {
        _id: string;
        username: string;
        message: string;
        createdAt: string;
      };
    };
  }
) => {
  const { name, message } = action.payload;
  // Only delete if the message is the user's
  const user = await User.findOne({ name });
  // Delete the message from Messages, Maybe need to delete reference in channel too?
  await Message.deleteOne({ _id: message._id, user });
  // Send the messages back to users that are in this channel
  // Find channel first
  const channel = await Channel.findOne({ messages: { $all: [message._id] } }).populate({
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'user',
      model: 'User',
    },
  });
  // Find the users that are in this channel
  const users = await User.find({ currentChannel: channel._id });
  // Send to each of them
  users.forEach((user) => {
    io.to(user.socketId).emit('action', {
      type: 'io/messages',
      payload: reduceMessages(channel.messages),
    });
  });
};
