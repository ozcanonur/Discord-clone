import User from '../db/models/user';
import Server from '../db/models/server';

export const getCreateChannelValidationError = async (
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

export const getFriendRequestValidationError = async (name: string, friendName: string) => {
  if (friendName.length === 0) return `Friend name can't be empty.`;
  else if (name === friendName) return `You can't add yourself to the friend list!`;
  else {
    const friendExists = await User.exists({ name: friendName });
    if (!friendExists) return `User not found.`;
    // Find the user
    let user = await User.findOne({ name });
    // Find the friend
    const friend = await User.findOne({ name: friendName }).populate('friends');
    // Return if they are already friends
    const isAlreadyFriends: boolean = user.friends.includes(friend._id);
    if (isAlreadyFriends) return `${friendName} is already your friend!`;
  }
};

export const getCreateServerValidationError = async (server: string) => {
  if (server.split(' ').length > 3) return `Server name can't be longer than 4 words.`;
  else if (server.length === 0) return `Server name can't be empty.`;
  else if (await Server.exists({ name: server })) return `Server already exists.`;
};

export const getJoinServerValidationError = async (name: string, serverName: string) => {
  if (serverName.trim().length === 0) return `Server name can't be empty.`;
  else if (!(await Server.exists({ name: serverName }))) return `Server doesn't exist.`;
  else {
    // User already in server
    const user = await User.findOne({ name }).populate('servers');
    const userServers = user.servers.map((server) => server.name);
    if (userServers.includes(serverName)) return `You are already in this server.`;
  }
};
