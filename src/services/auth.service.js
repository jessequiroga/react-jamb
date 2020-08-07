import axios from "axios";

// const API_URL = "http://localhost:8080/auth";npm
// const API_URL = "http://www.jamb.com.hr/auth";
const API_URL = "http://jamb-spring.herokuapp.com/auth";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "/login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, password) {
    return axios.post(API_URL + "/register", {
      username,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();