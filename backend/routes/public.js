import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import commonValidation from '../validators/signup';
import loginValidation from '../validators/login';
import User from '../models/user';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import jwt from 'jsonwebtoken';

const Router = express.Router();

//check if there is user with the same username
function validateSignupInput(data, otherValidation){
  let { errors } = otherValidation(data);
  const { username } = data;

  return User.findOne({username: username}).then(user => {
    if(user){
      if (user.username === username){
        errors.username = "There is user with this username!";
      }
    }
    return {
      errors,
      isValid: isEmpty(errors)
    }
  })
}

//fetch existed polls
Router.get('/list', (req, res) => {
  //first fetch user whose poll is not empty
  User.find({polls: {$gt: []}}, (err, users) => {
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

//sign up route
Router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  validateSignupInput(req.body, commonValidation).then(({ errors, isValid }) => {
    if(isValid){
      const password_digest = bcrypt.hashSync(password, 10);
      User.create({ username, password_digest }).then(user => {
        res.json({user, message: 'Signed up successfully!'})
      })
    } else {
      res.status(401).json(errors)
    }
  })
})

//login route
Router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  const { errors, isValid } = loginValidation(req.body);
  if(isValid){
    User.findOne({ username: username }).then(user => {
      if(user){
        if(bcrypt.compareSync(password, user["password_digest"])){
          const token = jwt.sign({
            username: user.username,
            id: user._id.toString()
          }, 'keyforjwt')
          res.json({token, user, message: 'Logged in successfully!'})
        } else {
          errors.login = "Invalid username/password pair";
          res.status(401).json(errors)
        }
      } else {
        errors.login = "Invalid username/password pair";
        res.status(401).json(errors)
      }
    })
  } else {
    res.status(400).json(errors)
  }
})

Router.get('/signup/:name', (req, res) => {
  let errors = {};
  User.findOne({username: req.params.name}).then(user => {
    if(user){
      if (user.username === req.params.name){
        errors.username = "There is user with this username!";
      }
      res.status(400).json(errors)
    } else {
      res.send({})
    }
  })
})

Router.post('/vote', (req, res) => {
  const { _id, option } = req.body;

  User.findOne({'polls._id': _id}, (err, user) => {
    //get a sub-document by id
    const doc = user.polls.id(_id);
    //find the chosen option
    for(let i=0; i<doc.options.length; i++){
      if (doc["options"][i]["name"] === option){
        doc["options"][i]["times"] = doc["options"][i]["times"] + 1;
      }
    }

    user.save((err, updateUser) => {
      if (err) {
        res.status(400).json({error: "Fail to vote!"})
      }
      res.json({ success: "Vote successfully!"});
    })
  })
})

Router.get('/polls/:id', (req, res) => {
  User.findOne({'polls._id': req.params.id}, (err, user) => {
    //get a sub-document by id
    const doc = user.polls.id(req.params.id);
    if(doc){
      res.json(doc);
    } else {
      res.status(400).json({error: "Fail to load the poll!"})
    }
  })
})

export default Router;
