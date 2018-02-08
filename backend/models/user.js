import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PollSchema = new Schema({
  topic: String,
  options: [String]
})

const UserSchema = new Schema({
  username: String,
  password_digest: String,
  polls: [PollSchema]
})

const User = mongoose.model('user', UserSchema);

export default User;
