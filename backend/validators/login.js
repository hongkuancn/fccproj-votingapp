import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function(input){
  let errors = {};
  const { username, password } = input;
  if(validator.isEmpty(username)){
    errors.username = 'Username cannot be empty!'
  } else if (validator.isEmpty(password)){
    errors.password = 'Password cannot be empty!'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
