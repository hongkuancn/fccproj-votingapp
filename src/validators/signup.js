import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function(input){
  let errors = {};
  const { username, password, passwordConfirmation } = input;
  if(validator.isEmpty(username)){
    errors.username = 'Username cannot be empty!'
  }
  if (validator.isEmpty(password)){
    errors.password = 'Password cannot be empty!'
  }
  if (validator.isEmpty(passwordConfirmation)){
    errors.passwordConfirmation = 'Password Confirmation cannot be empty!'
  }
  if (!validator.equals(password, passwordConfirmation)){
    errors.passwordConfirmation = "The password doesn't match!"
  };
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
