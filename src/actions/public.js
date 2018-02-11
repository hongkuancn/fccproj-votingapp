import axios from 'axios';
import setAuthentication from '../utils/setAuthentication';
import jwtDecode from 'jwt-decode';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

function authenticated(data){
  return {
    type: SET_CURRENT_USER,
    data
  }
}

function addMessage(message){
  return {
    type: ADD_MESSAGE,
    message
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
      .then(response => {
      	console.log(response);
        return response;
      })
      .then(res => {
        dispatch(addMessage(res.data.message));
        console.log(res.data.message);
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
      	console.log(res);
        return res;
      })
      .then(res => {
        const token = res.data.token;
        localStorage.setItem('votex-token', token);
        setAuthentication(token);
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
    return axios.get(`api/public/polls/${id}`)
  }
}
