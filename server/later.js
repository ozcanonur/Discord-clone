// const onUserCreatedServer = (socket, action) => {
//   const { username, server } = action.payload;
//   const user = findUserByUsername(users, username);
//   user.servers.push(server);
//   servers.push(server);
//   emitServers(socket, user.servers);
// };

// const onUserSelectedChannel = (socket, action) => {
//   const { username, server, channelName } = action.payload;
//   const user = findUserByUsername(users, username);
//   user.currentChannel = server.name + channelName;
//   socket.join(server.name + channelName);
// };

// const onUserSentMessage = (action) => {
//   const { username, message } = action.payload;
//   const user = findUserByUsername(users, username);
//   io.to(user.currentChannel).emit('action', {
//     type: 'messages',
//     payload: { username, message },
//   });
// };

//  case 'io/userCreatedServer':
//         // onUserCreatedServer(socket, action);
//         break;
//       case 'io/userSelectedChannel':
//         // onUserSelectedChannel(socket, action);
//         break;
//       case 'io/userMessaged':
//         // onUserSentMessage(action);
//         break;

const emitServers = (socket, servers) => {
  socket.emit('action', { type: 'servers', payload: servers });
};

const addUser = async (name, socketId) => {
  // // If user exists
  // const user = findUserByUsername(users, name);
  // if (user) return user;

  // Add default server at the start

  return newUser;
};
