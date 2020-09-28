const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let users = [];
let messages = [];

// Emit the current users to all sockets
const emitUsers = (io, users) => {
  io.emit('action', { type: 'users', payload: users });
};

const addUser = (users, username, socketId) => {
  users.push({ username, socketId });
};

const onJoin = (io, socket, action, users) => {
  const username = action.payload;
  addUser(users, username, socket.id);
  emitUsers(io, users);
};

const emitMessages = (io, messages) => {
  io.emit('action', { type: 'messages', payload: messages });
};

const addMessage = (messages, username, text) => {
  messages.push({ username, text });
};

io.on('connection', (socket) => {
  socket.on('action', (action) => {
    switch (action.type) {
      case 'io/message':
        const { username } = users.find((user) => user.socketId === socket.id);
        addMessage(messages, username, action.payload);
        emitMessages(io, messages);
        break;
      case 'io/join':
        onJoin(io, socket, action, users);
        emitMessages(io, messages);
        break;
      default:
        break;
    }
  });

  socket.on('disconnect', () => {
    users = users.filter((user) => user.socketId !== socket.id);
    emitUsers(io, users);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
