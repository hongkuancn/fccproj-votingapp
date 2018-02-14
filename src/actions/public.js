import axios from 'axios';
import setAuthenticationToken from '../utils/setAuthenticationToken';
import jwtDecode from 'jwt-decode';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const ADD_POLL = 'ADD_POLL';

export function authenticated(data){
  return {
    type: SET_CURRENT_USER,
    data
  }
}

export function addMessage(message){
  return {
    type: ADD_MESSAGE,
    message
  }
}

export function addPoll(poll){
  return {
    type: ADD_POLL,
    poll
  }
}

function deleteMessage(){
  return {
    type: DELETE_MESSAGE
  }
}

export function signupUser(userData){
  return dispatch => {
    return axios.post('/api/public/signup', userData)
      .then(res => {
        dispatch(addMessage(res.data.message));
        return res;
      })
  }
}

export function fetchList(){
  return dispatch => {
    return axios.get('/api/public/list');
  }
}

export function loginUser(userData){
  return dispatch => {
    return axios.post('/api/public/login', userData)
      .then(res => {
        const token = res.data.token;
        localStorage.setItem('votex-token', token);
        setAuthenticationToken(token);
        dispatch(authenticated(jwtDecode(token)));
        dispatch(addMessage(res.data.message));
        return res;
      })
  }
}

export function closeMessage(){
  return dispatch => {
    dispatch(deleteMessage())
  }
}

export function isUserExist(name){
  return dispatch => {
    return axios.get(`/api/public/signup/${name}`)
  }
}

export function fetchPoll(id){
  return dispatch => {
    return axios.get(`/api/public/polls/${id}`)
      .then(res => {
          dispatch(addPoll(res.data.doc))
        return res
      })
  }
}

export function vote(data){
  return dispatch => {
    return axios.post('/api/public/vote', data)
      .then(res => {
          dispatch(addPoll(res.data.doc))
        return res
      })
      // .then(res => {console.log(res); return res})
  }
}

export function addOption(data){
  return dispatch => {
    return axios.post('/api/public/addoption', data)
      .then(res => {
          dispatch(addPoll(res.data.doc));
          dispatch(addMessage(res.data.message));
        return res;
      }
    )
  }
}

// export function shareOnTwitter(data){
//   return axios.post("http://api.twitter.com/1.1/statuses/update.json?status=Maybe%20he%27ll%20finally%20find%20his%20keys.%20%23peterfalk", data)
// }
