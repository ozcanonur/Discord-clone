const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
  message: String,
  createdAt: Date,
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
