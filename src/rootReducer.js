import { combineReducers } from 'redux';
import Auth from './reducers/auth';
import FlashMessage from './reducers/flashmessage';

export default combineReducers({
  Auth,
  FlashMessage
})
