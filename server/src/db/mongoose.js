const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://127.0.0.1:27017/discord', {
  useNewUrlParser: true,
  useCreateIndex: true,
});
