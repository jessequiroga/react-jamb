import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = "http://localhost:8080";
// const API_URL = 'http://www.jamb.com.hr';
const API_URL = 'https://jamb-spring.herokuapp.com';

class UserService {
  getPublicContent() {
    return axios.get(API_URL);
  }
  
  getAdminBoard() {
    return axios.get(API_URL + '/admin', { headers: authHeader() });
  }
}

export default new UserService();
