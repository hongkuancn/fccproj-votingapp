import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  name: String,
  times: {
    type: Number,
    default: 0
  }
})

const PollSchema = new Schema({
  topic: String,
  options: [OptionSchema]
})

const UserSchema = new Schema({
  username: String,
  password_digest: String,
  polls: [PollSchema]
})

const User = mongoose.model('user', UserSchema);

export default User;
