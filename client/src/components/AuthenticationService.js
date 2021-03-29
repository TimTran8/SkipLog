import axios from "axios";

class AuthenticationService {
  signin = (username, password) => {
    
    return axios.post('http://localhost:5000/login', {username, password} , { withCredentials: true })
      .then(res => {
        console.log(res.data);
        console.log("Redirecting");
        console.log("Cookie:", res.cookie);
        // this.props.setAuth(true);
        // this.props.getAuth();
        console.log("res data", res.data);
        if (res.data) {
          // localStorage.setItem("token", "Bearer " + res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        // window.location = "/workouts";
        // this.props.history.push('/workouts')
        return res.data;
      })
      // redirect to home
      .catch(e => {
        console.log(e);
        // add errors to the DOM
      });

    // return axios.post("http://localhost:5000/login", { username, password })
    //   .then(response => {
    //     if (response.data.accessToken) {
    //       localStorage.setItem("user", JSON.stringify(response.data));
    //     }
    //     return response.data;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     throw err;
    //   });
  }

  signOut() {
    localStorage.removeItem("user");
  }

  register = async (firstname, lastname, username, email, password) => {
    return axios.post("/api/auth/signup", {
      firstname,
      lastname,
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthenticationService();