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
        res.json({ message: "Add a new poll successfully!"});
      })
    } else {
      res.status(400).json({error: "Fail to add a new poll!"})
    }
  })
})

//fetch one user's polls
Router.get('/:id', (req, res) => {
  //first find user by id
  User.findOne({ _id : req.params.id }, (err, user) => {
    if (err){
      res.status(400).json({error: "Fail to find the user!"})
    }
    if(user){
      const list = user.polls;
      if(list){
        res.json(list)
      } else {
        res.json({})
      }
    } else {
      res.status(400).json({error: "Fail to find the user!"})
    }
  }
)})

//delete a poll
Router.delete('/:id', (req, res) => {

  User.findOne({'polls._id': req.params.id}, (err, user) => {
    //remove the sub-document by id
    user.polls.id(req.params.id).remove();

    user.save((err, updateUser) => {
      res.json({ message: "Delete the poll successfully!"});
    })
  })
})

export default Router;
