import { ADD_POLL } from '../actions/public';

export default function(state={}, action={}){
  switch (action.type) {
    case ADD_POLL:
      return {
        poll: action.poll
      }
    // case VOTE_POLL:
    //   return {
    //     message: ''
    //   }

    default: return state;
  }
}
