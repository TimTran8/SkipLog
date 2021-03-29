import React from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
// import { BrowserRouter as Router, Link, Redirect, Route, Switch } from "react-router-dom";
import NavbarMenu from './components/NavbarMenu';
import Workouts from './components/Workouts';
import Log from './components/Log';
import Profile from './components/Profile';
import Login from './components/Login';
// import Signup from './components/Signup';
import Home from './components/Home';
// import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import AuthenticationService from './components/AuthenticationService';
// import { Nav } from 'react-bootstrap';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.setAuth = this.setAuth.bind(this);
    this.getAuth = this.getAuth.bind(this);
    this.state = {
      isAuthenticated: false,
      isLoading: true,
      username: undefined,
      userId: undefined,
      token: undefined
    }
  }

  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();

    if (user) {
      this.setState({
        isAuthenticated: true,
        isLoading: false
      });
      console.log("Updated isauth");
    }
  }

  setAuth(value) {
    console.log("Auth:", value);
    if (value) {
      this.setState({
        isAuthenticated: true
      });
      console.log("updated props", this.state);
    }
  }

  getAuth() {
    console.log("Authenticated:", this.state.isAuthenticated);
  }

  render() {

    return (
      <Router>
        <NavbarMenu/>
        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute  restricted={false} path="/login" component={() => <Login setAuth={this.setAuth} />} exact />
          <ProtectedRoute setAuth={this.setAuth} isAuth={this.state.isAuthenticated} getAuth={this.getAuth} component={Workouts} path="/workouts" exact />
          <ProtectedRoute component={Log} path="/log" exact />
          <ProtectedRoute component={Profile} path="/profile" exact />
        </Switch>
      </Router>
      // <Router>
      //   <div className="App">
      //     <NavbarMenu />
      //     <div className="container">
      //       <Switch>
      //         <Route exact path="/" component={Home} />
      //         <Route exact path="/login" component={Login} />
      //       </Switch>
      //       {/* <Route path="/" render={() => (
      //         getSession() ? (
      //           <App to="/"/>
      //         ) : (
      //           <Redirect to="/login"/>
      //         )
      //       )}/> */}
      //       {/* <Route path="/" exact component={SignIn}></Route> */}
      //       {/* <Route path="/" exact component={Home}></Route>
      //       <Route path="/workouts" exact component={Workouts}></Route>
      //       <Route path="/signup" exact component={Signup}></Route>
      //       <Route path="/login" exact component={Login}></Route>
      //       <Route path="/log" component={Log}></Route>
      //       <Route path="/profile" component={Profile}></Route> */}
      //     </div>
      //   </div>
      // </Router>
    )
  }
}


