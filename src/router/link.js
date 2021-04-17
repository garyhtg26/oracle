import store from '../stores/index.js'
import axios from 'axios'
if (store.state.authentication) {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + store.state.authentication
}
// axios.defaults.baseURL = "http://localhost/Generator/dev/";

export default {
  // url: 'http://localhost/Ekoko/api/',
  // admin: 'http://localhost/Ekoko/api/admin/',
  // public: 'http://localhost/Ekoko/public/',
  url: 'https://kokolim.com/marketplace/api/',
  admin: 'https://kokolim.com/marketplace/api/admin/',
  public: 'https://kokolim.com/marketplace/public/',
  
}
