const mongoose = require('mongoose');

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  socketId: {
    type: String,
  },
  servers: [
    {
      type: String,
    },
  ],
  online: {
    type: Boolean,
  },
});

module.exports = { User };
