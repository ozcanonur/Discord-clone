import { Document, Model, Schema, model } from 'mongoose';
import { IUser } from './user';

const NoteSchema = new Schema({
  about: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  note: String,
});

export interface INote extends Document {
  about?: IUser;
  note: string;
}

const Note: Model<INote> = model<INote>('Note', NoteSchema);

export default Note;
