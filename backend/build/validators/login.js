'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (input) {
  var errors = {};
  var username = input.username,
      password = input.password;

  if (_validator2.default.isEmpty(username)) {
    errors.username = 'Username cannot be empty!';
  } else if (_validator2.default.isEmpty(password)) {
    errors.password = 'Password cannot be empty!';
  }
  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
};

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }