import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function(input){
  let errors = {};
  const { topic, options } = input;
  if(validator.isEmpty(topic)){
    errors.topic = 'Topic cannot be empty!'
  }
  if (validator.isEmpty(options)){
    errors.options = 'Options cannot be empty!'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
