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
    url: 'https://projects.papermindvention.com/oracle/backend/api/',
    admin: 'https://projects.papermindvention.com/oracle/backend/api/admin/',
    public: 'https://projects.papermindvention.com/oracle/backend/public/',

}