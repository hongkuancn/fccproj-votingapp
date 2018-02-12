import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import authentication from '../middleware/authentication';

const Router = express.Router();

//authenticated user adds new poll
Router.post('/newpoll', authentication, (req, res) => {
  User.findOne({ _id: req.id }, (err, user) => {
    if (err){
      res.status(400).json({error: "Fail to add a new poll!"})
    }
    if(req.body){
      user.polls.push(req.body);
      user.save((err, updateUser) => {
        if (err) {
          res.status(400).json({error: "Fail to add a new poll!"})
        }
        res.json({ success: "Add a new poll successfully!"});
      })
    } else {
      res.status(400).json({error: "Fail to add a new poll!"})
    }
  })
})

export default Router;
