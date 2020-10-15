import { Document, Model, Schema, model } from 'mongoose';
import { IServer } from './server';
import { IChannel } from './channel';
import { INote } from './note';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  socketId: String,
  servers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Server',
    },
  ],
  currentChannel: {
    type: Schema.Types.ObjectId,
    ref: 'Channel',
  },
  online: Boolean,
  lastActiveAt: Date,
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  usersMessagedBefore: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
});

export interface IUser extends Document {
  name: string;
  password: string;
  socketId: string;
  servers?: IServer[];
  currentChannel?: IChannel;
  online: boolean;
  lastActiveAt: Date;
  friends?: IUser[];
  usersMessagedBefore?: IUser[];
  notes?: INote[];
}

const User: Model<IUser> = model<IUser>('User', UserSchema);
export default User;
