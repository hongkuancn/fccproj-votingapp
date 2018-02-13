import { SET_CURRENT_USER } from '../actions/public';
import isEmpty from 'lodash/isEmpty'

const initialState = {
  isAuthenticated: false,
  user: '',
  id: ''
}

export default function(state=initialState, action={}){
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.data),
        user: action.data.username,
        id: action.data.id
      }
    default: return state;
  }
}
