import axios from 'axios';
import { addMessage, authenticated } from './public';
import setAuthenticationToken from '../utils/setAuthenticationToken';

export function addNewPoll(data){
  return dispatch => {
    return axios.post('/api/private/newpoll', data)
      .then(res => {
        dispatch(addMessage(res.data.message));
        return res;
      })
  }
}

export function fetchMyList(id){
  return dispatch => {
    return axios.get(`/api/private/${id}`);
  }
}

export function deletePoll(id){
  return dispatch => {
    return axios.delete(`/api/private/${id}`)
      .then(res => {
        dispatch(addMessage(res.data.message));
        return res;
      })
  }
}

export function logout(){
  return dispatch => {
    localStorage.removeItem('votex-token');
    dispatch(authenticated({}));
    setAuthenticationToken(false);
    dispatch(addMessage("Log out successfully!"))
  }
}
