import { Document, Model, Schema, model } from 'mongoose';
import Message, { IMessage } from './message';
import { IUser } from './user';

const ChannelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  voice: {
    type: Boolean,
    default: false,
  },
  pinnedMessages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  voiceUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export interface IChannel extends Document {
  name?: any;
  messages?: IMessage[];
  voice?: boolean;
  pinnedMessages?: IMessage[];
  voiceUsers?: IUser[];
}

ChannelSchema.pre('remove', async function (next) {
  const channel: any = this;
  // Remove the messages in this channel
  const messageIds = channel.messages;
  await Message.deleteMany({ _id: { $in: messageIds } });

  next();
});

const Channel: Model<IChannel> = model<IChannel>('Channel', ChannelSchema);
export default Channel;
