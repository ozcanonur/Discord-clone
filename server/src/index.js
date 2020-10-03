const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const { searchUsers, searchChannels } = require('./utils');

const app = express();
const server = http.createServer(app);

module.exports = server;

require('./db/mongoose');
require('./io/io');

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

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
