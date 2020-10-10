import { Document, Model, Schema, model } from 'mongoose';

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
  name?: any; // WOOP
  messages?: any; // WOOP
  voice: boolean;
  category: string;
  pinnedMessages?: any; // WOOP
}

// ChannelSchema.pre('remove', async function (next) {
//   const channel: ChannelI = this;
//   // Remove the messages in this channel
//   const messageIds = channel.messages;
//   await Message.deleteMany({ _id: { $in: messageIds } });

//   next();
// });

const Channel: Model<IChannel> = model<IChannel>('Channel', ChannelSchema);
export default Channel;
