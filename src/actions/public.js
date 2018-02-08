import axios from 'axios';

export function signupUser(userData){
  return dispatch => {
    return axios.post('/api/signup', userData)
  }
}
