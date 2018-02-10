import { SET_CURRENT_USER } from '../actions/public';

const initialState = {
  isAuthenticated: false,
  user: ''
}

export default function(state=initialState, action={}){
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: true,
        user: action.data.username
      }
    default: return state;
  }
}
