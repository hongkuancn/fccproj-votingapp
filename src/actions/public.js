import axios from 'axios';

export const APPROVE_AUTHTICATION = 'APPROVE_AUTHTICATION';

function authenticated(data){
  return {
    type: APPROVE_AUTHTICATION,
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

export function loginUser(userData){
  return dispatch => {
    return axios.post('/api/login', userData)
      .then(res => {
      	console.log(res);
        return res;
      })
      .then(res => {
        dispatch(authenticated(res.data));
        return res;
      })
  }
}
