'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _authentication = require('../middleware/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();

//authenticated user adds new poll
Router.post('/newpoll', _authentication2.default, function (req, res) {
  _user2.default.findOne({ _id: req.id }, function (err, user) {
    if (err) {
      res.status(400).json({ error: "Fail to add a new poll!" });
    }
    if (req.body) {
      user.polls.push(req.body);
      user.save(function (err, updateUser) {
        if (err) {
          res.status(400).json({ error: "Fail to add a new poll!" });
        }
        res.json({ message: "Add a new poll successfully!" });
      });
    } else {
      res.status(400).json({ error: "Fail to add a new poll!" });
    }
  });
});

//fetch one user's polls
Router.get('/:id', _authentication2.default, function (req, res) {
  //first find user by id
  _user2.default.findOne({ _id: req.params.id }, function (err, user) {
    if (err) {
      res.status(400).json({ error: "Fail to find the user!" });
    }
    if (user) {
      var list = user.polls;
      if (list) {
        res.json(list);
      } else {
        res.json({});
      }
    } else {
      res.status(400).json({ error: "Fail to find the user!" });
    }
  });
});

//delete a poll
Router.delete('/:id', _authentication2.default, function (req, res) {

  _user2.default.findOne({ 'polls._id': req.params.id }, function (err, user) {
    //remove the sub-document by id
    user.polls.id(req.params.id).remove();

    user.save(function (err, updateUser) {
      res.json({ message: "Delete the poll successfully!" });
    });
  });
});

exports.default = Router;