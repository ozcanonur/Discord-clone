import { Document, Model, Schema, model } from 'mongoose';
import { IUser } from './user';

const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  message: String,
  createdAt: Date,
});

export interface IMessage extends Document {
  user?: IUser;
  message: string;
  createdAt: Date;
}

const Message: Model<IMessage> = model<IMessage>('Message', MessageSchema);
export default Message;
