'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _signup = require('../validators/signup');

var _signup2 = _interopRequireDefault(_signup);

var _login = require('../validators/login');

var _login2 = _interopRequireDefault(_login);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _findIndex = require('lodash/findIndex');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _publicip = require('publicip');

var _publicip2 = _interopRequireDefault(_publicip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();

//check if there is user with the same username
function validateSignupInput(data, otherValidation) {
  var _otherValidation = otherValidation(data),
      errors = _otherValidation.errors;

  var username = data.username;


  return _user2.default.findOne({ username: username }).then(function (user) {
    if (user) {
      if (user.username === username) {
        errors.username = "There is user with this username!";
      }
    }
    return {
      errors: errors,
      isValid: (0, _isEmpty2.default)(errors)
    };
  });
}

//fetch existed polls
Router.get('/list', function (req, res) {
  //first fetch user whose poll is not empty
  _user2.default.find({ polls: { $gt: [] } }, function (err, users) {
    var polls = (0, _map2.default)(users, function (user) {
      return user.polls;
    });
    var list = [];
    //it is a nested array, cannot use map to drop an outside array
    for (var i = 0; i < polls.length; i++) {
      for (var j = 0; j < polls[i].length; j++) {
        if (polls[i][j]) {
          list.push(polls[i][j]);
        }
      }
    }
    if (list) {
      res.json(list);
    } else {
      res.json({});
    }
  });
});

//sign up route
Router.post('/signup', function (req, res, next) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  validateSignupInput(req.body, _signup2.default).then(function (_ref) {
    var errors = _ref.errors,
        isValid = _ref.isValid;

    if (isValid) {
      var password_digest = _bcryptjs2.default.hashSync(password, 10);
      _user2.default.create({ username: username, password_digest: password_digest }).then(function (user) {
        res.json({ user: user, message: 'Signed up successfully!' });
      });
    } else {
      res.status(401).json(errors);
    }
  });
});

//This is for onBlur property when user signs up. Check if there is user with such username
Router.get('/signup/:name', function (req, res) {
  var errors = {};
  _user2.default.findOne({ username: req.params.name }).then(function (user) {
    if (user) {
      if (user.username === req.params.name) {
        errors.username = "There is user with this username!";
      }
      res.status(400).json(errors);
    } else {
      res.send({});
    }
  });
});

//login route
Router.post('/login', function (req, res, next) {
  var _req$body2 = req.body,
      username = _req$body2.username,
      password = _req$body2.password;

  var _loginValidation = (0, _login2.default)(req.body),
      errors = _loginValidation.errors,
      isValid = _loginValidation.isValid;

  if (isValid) {
    _user2.default.findOne({ username: username }).then(function (user) {
      if (user) {
        if (_bcryptjs2.default.compareSync(password, user["password_digest"])) {
          var token = _jsonwebtoken2.default.sign({
            username: user.username,
            id: user._id.toString()
          }, 'keyforjwt');
          res.json({ token: token, user: user, message: 'Log in successfully!' });
        } else {
          errors.login = "Invalid username/password pair";
          res.status(401).json(errors);
        }
      } else {
        errors.login = "Invalid username/password pair";
        res.status(401).json(errors);
      }
    });
  } else {
    res.status(400).json(errors);
  }
});

function checkIp(id) {
  _user2.default.findOne({ 'polls._id': id }, function (err, user) {
    //get a sub-document by id
    var index = void 0;
    var doc = user.polls.id(id);
    _publicip2.default.v4().then(function (ip) {
      console.log("ok");
      var index = (0, _findIndex2.default)(doc.ipaddress, function (item) {
        return item === ip;
      });
    });
    return index;
  });
}

//handle vote action
Router.post('/vote', function (req, res) {
  var _req$body3 = req.body,
      _id = _req$body3._id,
      option = _req$body3.option;
  // const index = checkIp(_id);
  // console.log(index)

  _user2.default.findOne({ 'polls._id': _id }, function (err, user) {
    _publicip2.default.v4().then(function (ip) {
      //get a sub-document by id
      var doc = user.polls.id(_id);
      var index = (0, _findIndex2.default)(doc.ipaddress, function (item) {
        return item === ip;
      });
      //when the ip has already voted
      if (index > -1) {
        res.status(400).json({ error: "Every IP address can vote once a poll!" });
      } else {
        //add ip address to db
        doc.ipaddress.push(ip);
        //find the chosen option
        (0, _map2.default)(doc.options, function (opt) {
          if (opt["name"] === option) {
            opt["times"]++;
          }
        });

        user.save(function (err, updateUser) {
          if (err) {
            res.status(400).json({ error: "Fail to vote!" });
          }
          res.json({ message: "Vote successfully!", doc: doc });
        });
      }
    });
  });
});

//fetch a poll and its userid
Router.get('/polls/:id', function (req, res) {
  _user2.default.findOne({ 'polls._id': req.params.id }, function (err, user) {
    var id = user._id;
    //get a sub-document by id
    var doc = user.polls.id(req.params.id);

    if (doc) {
      res.json({ doc: doc, id: id });
    } else {
      res.status(400).json({ error: "Fail to load the poll!" });
    }
  });
});

//add a new option
Router.post('/addoption', function (req, res) {
  var _req$body4 = req.body,
      _id = _req$body4._id,
      newOption = _req$body4.newOption;


  _user2.default.findOne({ 'polls._id': _id }, function (err, user) {
    _publicip2.default.v4().then(function (ip) {
      //get a sub-document by id
      var doc = user.polls.id(_id);
      if (doc) {
        var index = (0, _findIndex2.default)(doc.ipaddress, function (item) {
          return item === ip;
        });
        //when the ip has already voted
        if (index > -1) {
          res.status(400).json({ error: "Every IP address can vote once a poll!" });
        } else {
          doc.options.push({ name: newOption, times: 1 });
          user.save(function (err, updateUser) {
            if (err) {
              res.status(400).json({ error: "Fail to add a new option!" });
            }
            res.json({ message: "Add a new option successfully!", doc: doc });
          });
        }
      } else {
        res.status(400).json({ error: "Fail to add a new option!" });
      }
    });
  });
});

exports.default = Router;