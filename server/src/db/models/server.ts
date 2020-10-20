import { Document, Model, Schema, model } from 'mongoose';
import User, { IUser } from './user';
import Channel, { IChannel } from './channel';
import Message from './message';

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

export interface IServer extends Document {
  name: string;
  users?: IUser[];
  channels?: IChannel[];
  admin?: IUser;
}

// Delete the remnants of the server
ServerSchema.pre('remove', async function (next) {
  const server: any = this;
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

const Server: Model<IServer> = model<IServer>('Server', ServerSchema);
export default Server;
