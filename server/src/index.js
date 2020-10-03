const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const User = require('./db/models/user');
const Channel = require('./db/models/channel');
const Server = require('./db/models/server');

const app = express();
// app.use(cors);
const server = http.createServer(app);

module.exports = server;

require('./db/mongoose');
require('./io/io');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/search', async (req, res) => {
  const { type, text } = req.query;

  const searchUsers = async () => {
    let regex;
    // Search for all users if no text after @
    if (text.length === 0) regex = new RegExp('.*');
    else regex = new RegExp(`^${text}`);

    const users = await User.find({ name: { $regex: regex } });

    const results = [];
    for (let user of users) {
      results.push({ first: user.name, second: '', type: '@' });
    }

    return results;
  };

  const searchChannels = async () => {
    let regex;
    // Search for all channels if no text after #
    if (text.length === 0) regex = new RegExp('.*');
    else regex = new RegExp(`^${text}`);

    const channels = await Channel.find({ name: { $regex: regex } });

    const results = [];
    for (let channel of channels) {
      // Skip _private because it's reserved for private messaging channels
      if (channel.name.includes('_private')) continue;
      // Find the channel's server
      const server = await Server.findOne({ channels: { $all: [channel._id] } });
      results.push({ first: channel.name, second: server.name, type: '#' });
    }

    return results;
  };

  let results = [];
  if (type === '*') {
    const channelResults = await searchChannels();
    const userResults = await searchUsers();
    results = [...channelResults, ...userResults];
  } else if (type === '#') results = await searchChannels();
  else if (type === '@') results = await searchUsers();

  res.send(results);
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
