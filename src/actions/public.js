import axios from 'axios';
import setAuthentication from '../utils/setAuthentication';
import jwtDecode from 'jwt-decode';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

function authenticated(data){
  return {
    type: SET_CURRENT_USER,
    data
  }
}

export function signupUser(userData){
  return dispatch => {
    return axios.post('/api/signup', userData)
      .then(response => {
      	console.log(response)
      })
      .catch(error => {
        console.log(error.response)
      }
    );
  }
}

export function fetchList(){
  return dispatch => {
    return axios.get('/api/list');
  }
}

export function loginUser(userData){
  return dispatch => {
    return axios.post('/api/login', userData)
      .then(res => {
      	console.log(res);
        return res;
      })
      .then(res => {
        const token = res.data.token;
        localStorage.setItem('votex-token', token);
        setAuthentication(token);
        dispatch(authenticated(jwtDecode(token)));
        return res;
      })
  }
}
