const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { userExists } = require('./util');

const port = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);
const io = socketIo(server);

const users = [];

io.on('connection', (socket) => {
  console.log('Socket connected: ' + socket.id);

  socket.on('action', (action) => {
    switch (action.type) {
      case 'io/message':
        console.log('Got message data!', action.payload);
        socket.emit('action', { type: 'message', payload: 'Good day!' });
      case 'io/join':
        const newUsername = action.payload;
        users.push(newUsername);
        io.emit('action', { type: 'join', payload: users });
      default:
        break;
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
