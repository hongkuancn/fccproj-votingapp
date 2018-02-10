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
  User.find({}, (err, users) => {
    const list = map(users,(user) => user.polls)
    if(list){
      res.json(list)
    } else {
      res.json(null)
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

export default Router;
