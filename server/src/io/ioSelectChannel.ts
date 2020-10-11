import { Socket } from 'socket.io';
import User from '../db/models/user';
import Channel from '../db/models/channel';
import { IMessage } from '../db/models/message';
import { reduceMessages } from './util';

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
  // Update the user's current channel
  await User.updateOne({ name }, { currentChannel: channel });
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

export const onUserSelectedPrivateChannel = async (
  socket: Socket,
  action: {
    type: string;
    payload: {
      name: string;
      username: string;
    };
  }
) => {
  const { name, username } = action.payload;

  // Leave the current channel first
  const user = await User.findOne({ name }).populate('currentChannel');
  if (user.currentChannel) await socket.leave(user.currentChannel._id.toString());

  // Find the channel, try both combinations since we don't know who added who
  // And we created the channel name via concat'ing the names above
  const populateFields = {
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'user',
      model: 'User',
    },
  };
  let channel =
    (await Channel.findOne({ name: `${name}${username}_private` }).populate(populateFields)) ||
    (await Channel.findOne({ name: `${username}${name}_private` }).populate(populateFields));
  // Join the new channel

  await socket.join(channel._id.toString());

  // Update user's channel
  await User.updateOne({ name }, { currentChannel: channel });
  // Emit the older messages to the user
  socket.emit('action', { type: 'io/messages', payload: reduceMessages(channel.messages) });
};
