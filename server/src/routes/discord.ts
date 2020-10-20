import express, { Request } from 'express';
import { searchUsers, searchChannels, SearchResult } from '../utils/api';
import Server, { IServer } from '../db/models/server';
import User, { IUser } from '../db/models/user';
import Note, { INote } from '../db/models/note';
import { IChannel } from '../db/models/channel';

const router = express.Router();

interface ExtendedRequest extends Request {
  query: { [key: string]: string | undefined };
}

router.get('/search', async (req: ExtendedRequest, res) => {
  const { name, type, text } = req.query;

  let results: SearchResult[] = [];
  if (type === '*') {
    const channelResults = await searchChannels(text, name);
    const userResults = await searchUsers(text, name);
    results = [...channelResults, ...userResults];
  } else if (type === '#') results = await searchChannels(text, name);
  else if (type === '@') results = await searchUsers(text, name);

  res.send(results.slice(0, 20));
});

router.get('/userServers', async (req: ExtendedRequest, res, next) => {
  const { name } = req.query;

  const user = await User.findOne({ name }).populate('servers');
  const serverNames = user.servers.map((server) => server.name);
  if (user) return res.send(serverNames);
  next();
});

router.post('/note', async (req: ExtendedRequest, res) => {
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
  // Find if it already exists first
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

router.get('/note', async (req: ExtendedRequest, res) => {
  const { name, otherUserName } = req.query;

  // Find the user
  const user = await User.findOne({ name }).populate({
    path: 'notes',
    model: 'Note',
    populate: {
      path: 'about',
      model: 'User',
    },
  });

  // Find the note
  const note = user.notes.find((note) => note.about.name === otherUserName);
  if (note) res.send(note.note);
  else res.send('');
});

router.get('/exploreServers', async (req: ExtendedRequest, res) => {
  const { name, text } = req.query;

  let servers;
  if (text === '') servers = await Server.find().populate('users').populate('channels').limit(20);
  else
    servers = await Server.find({ name: new RegExp(`^${text}`, 'i') })
      .populate('users')
      .populate('channels')
      .limit(20);

  const response = servers.map((server) => {
    return {
      serverName: server.name,
      onlineUsers: server.users.filter((user) => user.online).length,
      totalUsers: server.users.length,
      channelCount: server.channels.length,
      messageCount: server.channels.reduce((acc, channel) => acc + channel.messages.length, 0),
      subscribed: server.users.some((user) => user.name === name),
    };
  });

  response.sort((x, y) => y.totalUsers - x.totalUsers);

  res.send(response);
});

router.get('/channelIds', async (req: ExtendedRequest, res) => {
  const { serverName } = req.query;

  const server = await Server.findOne({ name: serverName }).populate('channels');
  const channelIds = server.channels.map((channel: IChannel) => channel._id);

  res.send(channelIds);
});

// Gets pins that were created when the user was offline, a bit hacky.
router.get('/unseenPins', async (req: ExtendedRequest, res) => {
  const { name } = req.query;

  const user = await User.findOne({ name }).populate({
    path: 'servers',
    model: 'Server',
    populate: {
      path: 'channels',
      model: 'Channel',
      populate: {
        path: 'pinnedMessages',
        model: 'Message',
      },
    },
  });

  const unseenChannelsWhichHavePins: string[] = [];
  user.servers.forEach((server) => {
    server.channels.forEach((channel) => {
      const unseenPinExists = channel.pinnedMessages.some(
        (message) => message.createdAt.getTime() > user.lastActiveAt.getTime()
      );
      if (unseenPinExists) unseenChannelsWhichHavePins.push(channel._id);
    });
  });

  res.send(unseenChannelsWhichHavePins);
});

export default router;
