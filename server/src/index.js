const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const { searchUsers, searchChannels } = require('./utils');
const User = require('./db/models/user');
const Note = require('./db/models/note');

const app = express();
const server = http.createServer(app);

module.exports = server;

require('./db/mongoose');
require('./io/io');

app.use(express.static('../client/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/search', async (req, res) => {
  const { name, type, text } = req.query;

  let results = [];
  if (type === '*') {
    const channelResults = await searchChannels(text, name);
    const userResults = await searchUsers(text, name);
    results = [...channelResults, ...userResults];
  } else if (type === '#') results = await searchChannels(text, name);
  else if (type === '@') results = await searchUsers(text, name);

  res.send(results);
});

app.get('/userServers', async (req, res) => {
  const { name } = req.query;

  const user = await User.findOne({ name }).populate('servers');
  const serverNames = user.servers.map((server) => server.name);
  if (user) res.send(serverNames);
});

app.post('/note', async (req, res) => {
  const { name, otherUserName, note } = req.body;

  // Find the user
  const user = await User.findOne({ name }).populate({
    path: 'notes',
    model: 'Note',
    populate: {
      path: 'about',
      model: 'User',
    },
  });
  // Find if it exists first
  const otherUsersNote = user.notes.find((note) => note.about.name === otherUserName);
  if (otherUsersNote) await Note.updateOne({ _id: otherUsersNote._id }, { note });
  else {
    // Find the other user, and create the note
    const otherUser = await User.findOne({ name: otherUserName });
    const newNote = new Note({
      about: otherUser,
      note: note,
    });
    // Save the note
    await newNote.save();
    // Save the note to the user
    user.notes.push(newNote);
    await user.save();
  }

  res.send();
});

app.get('/note', async (req, res) => {
  const { name, otherUserName } = req.query;

  const user = await User.findOne({ name }).populate({
    path: 'notes',
    model: 'Note',
    populate: {
      path: 'about',
      model: 'User',
    },
  });
  const note = user.notes.find((note) => note.about.name === otherUserName);

  if (note) res.send(note.note);
});

// Catch all for deploy
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
    if (err) res.status(500).send(err);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
