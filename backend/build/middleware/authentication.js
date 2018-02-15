'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  var autoken = req.get('Auth-Token');
  var token = void 0;
  if (autoken) {
    token = autoken.split(' ')[1];
  }

  if (token) {
    _jsonwebtoken2.default.verify(token, 'keyforjwt', function (err, decoded) {
      var id = decoded.id;

      _user2.default.findOne({ _id: id }, function (err, user) {
        if (err) {
          res.status(401).json({ error: 'Failed to authenticate' });
        };
        if (user) {
          req.id = id;
          next();
        } else {
          res.status(401).json({ error: 'No such user!' });
        }
      });
    });
  } else {
    res.status(401).json({ error: 'No token provided!' });
  }
};