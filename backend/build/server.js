'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _public = require('./routes/public');

var _public2 = _interopRequireDefault(_public);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());

// get reference to the client build directory
var staticFiles = _express2.default.static(_path2.default.join(__dirname, '../../build'));
// pass the static files (react app) to the express app.
app.use(staticFiles);

// const dbURL = "mongodb://localhost/votingapp";
var dbURL = "mongodb://user:user123@ds125388.mlab.com:25388/hk_votingapp";
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(dbURL, function () {
  console.log("connected to mongodb");
});

app.use('/api/public', _public2.default);
app.use('/api/private', _user2.default);

app.use(function (req, res) {
  res.status(404).json({
    errors: {
      global: "Still working on it. Please try it later when we implement it"
    }
  });
});

app.listen(process.env.PORT || 8080, function () {
  console.log("Server is running on port:8080");
});