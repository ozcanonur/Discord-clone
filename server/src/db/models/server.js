const mongoose = require('mongoose');

const Server = mongoose.model('Server', {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  channels: [
    {
      name: {
        type: String,
      },
      messages: [],
    },
  ],
  users: [],
});

module.exports = { Server };
