import axios from 'axios';

export function addNewPoll(data){
  return dispatch => {
    return axios.post('/api/private/newpoll', data);
  }
}
