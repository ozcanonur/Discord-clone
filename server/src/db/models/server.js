const Channel = require('./channel');
const Message = require('./message');
const User = require('./user');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  channels: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Channel',
    },
  ],
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Delete the remnants of the server also
ServerSchema.pre('remove', async function (next) {
  const server = this;
  // Find everyone subscribed to this server
  const users = await User.find({ _id: { $in: server.users } });
  // Delete the server from them
  for (let user of users) {
    const newServers = user.servers.filter((s) => s._id.toString() !== server._id.toString());
    user.servers = newServers;
    await user.save();
  }

  // Delete messages
  const channels = await Channel.find({ _id: { $in: server.channels } }).populate('messages');
  // Find message Ids
  const messageIds = channels
    .map((ch) => ch.messages)
    .flat()
    .map((m) => m._id);
  await Message.deleteMany({ _id: { $in: messageIds } });
  // Delete channels
  await Channel.deleteMany({ _id: { $in: server.channels } });

  next();
});

const Server = mongoose.model('Server', ServerSchema);
module.exports = Server;
