import axios from 'axios';

export default function setAuthentication(token){
  if(token){
    axios.defaults.headers.common["Auth-Token"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Auth-Token"];
  }
}
