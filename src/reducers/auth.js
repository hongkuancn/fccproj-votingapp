import {APPROVE_AUTHTICATION} from '../actions/public';

const initialState = {
  isAuthenticated: false,
  user: ''
}

export default function(state=initialState, action={}){
  switch (action.type) {
    case APPROVE_AUTHTICATION:
      return {
        isAuthenticated: true,
        user: action.data.username
      }
    default: return state;
  }
}
