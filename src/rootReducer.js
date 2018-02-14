import { combineReducers } from 'redux';
import Auth from './reducers/auth';
import FlashMessage from './reducers/flashmessage';
import Poll from './reducers/poll';

export default combineReducers({
  Auth,
  FlashMessage,
  Poll
})
