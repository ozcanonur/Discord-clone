import Channel from '../db/models/channel';
import User, { IUser } from '../db/models/user';
import Server, { IServer } from '../db/models/server';

export const findUsersSubscribedToServer = async (server: IServer) => {
  try {
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
  } catch (err) {
    console.error(err);
  }
};

export const findChannelByIdAndPopulateMessages = async (id: string) => {
  try {
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
  } catch (err) {
    console.error(err);
  }
};

export const findUserByNameAndPopulatePrivate = async (name: string) => {
  try {
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
  } catch (err) {
    console.error(err);
  }
};

export const findUserServers = async (user: IUser) => {
  try {
    return await Server.find({ _id: { $in: user.servers } }).populate({
      path: 'channels',
      model: 'Channel',
      populate: {
        path: 'voiceUsers',
        model: 'User',
      },
    });
  } catch (err) {
    console.error(err);
  }
};
