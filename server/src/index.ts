import express, { Request, Response } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';

import { searchUsers, searchChannels, SearchResult } from './utils';
import Server, { IServer } from './db/models/server';
import User, { IUser } from './db/models/user';
import Note, { INote } from './db/models/note';

const app = express();
const server = http.createServer(app);

export default server;

// WOOP change to import try
require('./db/mongoose');
require('./io/io');

app.use(express.static('../client/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

interface ExtendedRequest extends Request {
  query: { [key: string]: string | undefined };
}

app.get('/search', async (req: ExtendedRequest, res: Response) => {
  const { name, type, text } = req.query;

  let results: SearchResult[] = [];
  if (type === '*') {
    const channelResults: SearchResult[] = await searchChannels(text, name);
    const userResults: SearchResult[] = await searchUsers(text, name);
    results = [...channelResults, ...userResults];
  } else if (type === '#') results = await searchChannels(text, name);
  else if (type === '@') results = await searchUsers(text, name);

  res.send(results.slice(0, 20));
});

app.get('/userServers', async (req: ExtendedRequest, res: Response) => {
  const { name } = req.query;

  const user: IUser = await User.findOne({ name }).populate('servers');
  const serverNames: string[] = user.servers.map((server: IServer) => server.name);
  if (user) res.send(serverNames);
});

app.post('/note', async (req: ExtendedRequest, res: Response) => {
  const { name, otherUserName, note } = req.body;

  // Find the user
  const user: IUser = await User.findOne({ name }).populate({
    path: 'notes',
    model: 'Note',
    populate: {
      path: 'about',
      model: 'User',
    },
  });
  // Find if it exists first
  const otherUsersNote: INote = user.notes.find((note: INote) => note.about.name === otherUserName);
  if (otherUsersNote) await Note.updateOne({ _id: otherUsersNote._id }, { note });
  else {
    // Find the other user, and create the note
    const otherUser: IUser = await User.findOne({ name: otherUserName });
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

app.get('/note', async (req: ExtendedRequest, res: Response) => {
  const { name, otherUserName } = req.query;

  // Find the user
  const user: IUser = await User.findOne({ name }).populate({
    path: 'notes',
    model: 'Note',
    populate: {
      path: 'about',
      model: 'User',
    },
  });

  // Find the note
  const note = user.notes.find((note: INote) => note.about.name === otherUserName);
  if (note) res.send(note.note);
  else res.send('');
});

app.get('/exploreServers', async (req: ExtendedRequest, res: Response) => {
  const servers = await Server.find().populate('users').populate('channels').limit(20);

  const response = [];
  for (let server of servers) {
    const serverName = server.name;
    const onlineUsers = server.users.filter((user: IUser) => user.online).length;
    const totalUsers = server.users.length;
    const channelCount = server.channels.length;
    let messageCount = 0;
    for (let channel of server.channels) {
      messageCount += channel.messages.length;
    }
    response.push({ serverName, onlineUsers, totalUsers, channelCount, messageCount });
  }

  response.sort((x, y) => y.totalUsers - x.totalUsers);

  res.send(response);
});

// Catch all for deploy
app.get('/*', function (req, res: Response) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
    if (err) res.status(500).send(err);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
