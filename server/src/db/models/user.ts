import { Document, Model, Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
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
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
});

export interface IUser extends Document {
  name: string;
  socketId: string;
  servers?: any; // WOOP
  currentChannel?: any; // WOOP
  online: boolean;
  lastActiveAt: Date;
  friends?: any; // WOOP
  notes?: any; // WOOP
}

const User: Model<IUser> = model<IUser>('User', UserSchema);
export default User;
