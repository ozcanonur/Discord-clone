import { Document, Model, Schema, model } from 'mongoose';
import Message, { IMessage } from './message';

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
  category: String,
  pinnedMessages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

export interface IChannel extends Document {
  name?: any;
  messages?: IMessage[];
  voice?: boolean;
  category?: string;
  pinnedMessages?: IMessage[];
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
