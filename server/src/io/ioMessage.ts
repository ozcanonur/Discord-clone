import { Socket } from 'socket.io';
import User from '../db/models/user';
import Channel from '../db/models/channel';
import Message from '../db/models/message';

import { emitPrivateMessageNotification, emitMessagesToChannel } from '../utils/emit';
import { reduceMessages } from '../utils/reduce';

export const onUserMessaged = async (
  io: SocketIO.Server,
  socket: Socket,
  action: MessageIOAction
) => {
  const { message } = action.payload;

  // Find the user
  const user = await User.findOne({ socketId: socket.id }).populate('currentChannel');

  // Find the channel
  const channel = await Channel.findOne({ _id: user.currentChannel }).populate({
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'user',
      model: 'User',
    },
  });

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

  // Send the messages in the channel back
  emitMessagesToChannel(io, channel);

  // Send a notification if it's a private message
  if (user.currentChannel.name.includes('private')) emitPrivateMessageNotification(io, user);
};

export const onUserDeletedMessage = async (
  io: SocketIO.Server,
  socket: Socket,
  action: DeleteMessageIOAction
) => {
  const { message } = action.payload;

  // Only delete if the message is the user's
  const user = await User.findOne({ socketId: socket.id });
  if (message.username !== user.name) return;

  // Delete the message from Messages, Maybe need to delete reference in channel too?
  await Message.deleteOne({ _id: message._id });

  // Send the messages back to users that are in this channel
  // Find channel first
  // @ts-ignore, WOOP
  const channel = await Channel.findOne({ messages: { _id: message._id } }).populate({
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'user',
      model: 'User',
    },
  });

  // Send to all of them
  emitMessagesToChannel(io, channel);
};
