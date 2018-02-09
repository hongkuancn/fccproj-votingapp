import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import commonValidation from '../validators/signup';
import loginValidation from '../validators/login';
import User from '../models/user';
import isEmpty from 'lodash/isEmpty';

const Router = express.Router();

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

Router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  validateSignupInput(req.body, commonValidation).then(({ errors, isValid }) => {
    if(isValid){
      const password_digest = bcrypt.hashSync(password, 10);
      User.create({ username, password_digest }).then(user => {
        res.json(user)
      })
    } else {
      res.status(400).json(errors)
    }
  })
})

Router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  const { errors, isValid } = loginValidation(req.body);
  if(isValid){
    User.findOne({ username: username }).then(user => {
      if(user){
        if(bcrypt.compareSync(password, user["password_digest"])){
          res.json(user)
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
