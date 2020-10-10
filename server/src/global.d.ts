import { Document } from 'mongoose';
import User from './db/models/user';
import Message from './db/models/message';
import Server from './db/models/server';
import Channel from './db/models/channel';

// interface IMessage {
//   user?: IUser['_id'];
//   message: string;
//   createdAt: string;
// }

// interface MessageDocument extends IMessage, Document {
//   _id: string;
// }

// interface INote extends Document {
//   about: UserI['_id'];
//   note: string;
// }

// interface IChannel extends Document {
//   messages: MessageI['_id'][];
//   voice: boolean;
//   pinnedMessages: MessageI['_id'][];
//   name: string;
// }

// interface IUser extends Document {
//   servers: ServerI['_id'][];
//   friends: UserI['_id'][];
//   notes: NoteI['_id'][];
//   name: string;
//   socketId: string;
//   online: boolean;
//   lastActiveAt: string;
//   currentChannel: ChannelI['_id'];
// }

// interface IServer extends Document {
//   users: UserI['_id'][];
//   channels: ChannelI['_id'][];
//   name: string;
//   admin: UserI['_id'];
// }
