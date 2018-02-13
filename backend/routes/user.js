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

//fetch existed polls
Router.get('/list', (req, res) => {
  //first fetch user whose poll is not empty
  User.findOne({polls: {$gt: []}}, (err, users) => {
    const polls = map(users,(user) => user.polls);
    let list = [];
    //it is a nested array, cannot use map to drop an outside array
    for(let i=0;i<polls.length;i++){
    	for(let j=0;j<polls[i].length;j++){
        if(polls[i][j]){
          list.push(polls[i][j])
        }
    	}
    }
    if(list){
      res.json(list)
    } else {
      res.json({})
    }
  }
)})


export default Router;
