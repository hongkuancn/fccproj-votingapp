import axios from 'axios';
import { addMessage } from './public'

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
