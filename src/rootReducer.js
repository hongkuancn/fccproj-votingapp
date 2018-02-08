import { combineReducers } from 'redux';
import isAuthenticated from './reducers/auth';


export default combineReducers({
  isAuthenticated
})
