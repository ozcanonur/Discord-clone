import { Document, Model, Schema, model } from 'mongoose';

const NoteSchema = new Schema({
  about: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  note: String,
});

export interface INote extends Document {
  about?: any; // WOOP
  note: string;
}

const Note: Model<INote> = model<INote>('Note', NoteSchema);

export default Note;
