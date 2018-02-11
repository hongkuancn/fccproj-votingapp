import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import authentication from '../middleware/authentication';

const Router = express.Router();

//authenticated user adds new poll
Router.post('/newpoll', authentication, (req, res) => {

  User.findOne({ _id: req.id }, (err, user) => {
    user.polls.push(req.body);
    user.save((err, updateUser) => {
      res.send(updateUser);
    })
  })
})

export default Router;
