'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var OptionSchema = new Schema({
  name: String,
  times: {
    type: Number,
    default: 0
  }
});

var PollSchema = new Schema({
  topic: String,
  options: [OptionSchema],
  ipaddress: [String]
});

var UserSchema = new Schema({
  username: String,
  password_digest: String,
  polls: [PollSchema]
});

var User = _mongoose2.default.model('user', UserSchema);

exports.default = User;