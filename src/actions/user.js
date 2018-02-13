import axios from 'axios';

export function addNewPoll(data){
  return dispatch => {
    return axios.post('/api/private/newpoll', data)
      .then(res => console.log(res.data));
  }
}

export function fetchMyList(data){
  return dispatch => {
    return axios.get('/api/user/list', data);
  }
}
