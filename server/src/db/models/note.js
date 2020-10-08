const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  about: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  note: String,
});

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;
