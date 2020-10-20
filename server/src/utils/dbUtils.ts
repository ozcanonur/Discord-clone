import Channel from '../db/models/channel';
import User, { IUser } from '../db/models/user';
import Server, { IServer } from '../db/models/server';

export const findUsersSubscribedToServer = async (server: IServer) => {
  return await User.find({ _id: { $in: server.users } }).populate({
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
  });
};

export const findChannelByIdAndPopulateMessages = async (id: string) => {
  return await Channel.findOne({ _id: id }).populate([
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
};

export const findUserByNameAndPopulatePrivate = async (name: string) => {
  return await User.findOne({ name }).populate([
    {
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
    {
      path: 'friends',
      model: 'User',
    },
    {
      path: 'usersMessagedBefore',
      model: 'User',
    },
  ]);
};

export const findUserServers = async (user: IUser) => {
  return await Server.find({ _id: { $in: user.servers } }).populate({
    path: 'channels',
    model: 'Channel',
    populate: {
      path: 'voiceUsers',
      model: 'User',
    },
  });
};
