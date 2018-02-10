import { ADD_MESSAGE, DELETE_MESSAGE } from '../actions/public';

let initialState = {
  message: ''
}

export default function(state=initialState, action={}){
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        message: action.message
      }
    case DELETE_MESSAGE:
      return {
        message: ''
      }
    default: return state;
  }
}
