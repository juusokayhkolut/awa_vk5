import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITodo {
  _id?: Types.ObjectId;
  todo: string;
  checked: boolean;
}

export interface IUser extends Document {
  name: string;
  todos: ITodo[];
}

const TodoSchema: Schema = new Schema({
  todo: { type: String, required: true },
  checked: { type: Boolean, default: false },
});

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  todos: { type: [TodoSchema], default: [] },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
