import React, { Component } from "react";
// import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
// import axios from 'axios';
import { Redirect, Route } from "react-router-dom";
import AuthenticationService from './AuthenticationService';
class ProtectedRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //   isAuthenticated: false,
      isLogin: false,
      isLoading: true,
      user: undefined
      //   username: undefined,
      //   userId: undefined,
      //   token: undefined
    }
    // this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();
    if (user) {
      // this.props.setAuth(true);
      console.log("User exists", user);
      this.setState({
        isLogin: true,
        user: user.username,
        token: user.token,
        userId: user.userId
      //   isAuthenticated: true,
      //   isLoading: false
      })
    }
    console.log(user);

    // this.isAuthenticated()
  }

  isAuthenticated() {
    // const url = 'http://localhost:5000/auth'
    // fetch(url, {
    //   method: 'GET',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    console.log("Authenticating");
    // this.props.getAuth();
    console.log("Passed props", this.props);
    console.log("before check", this.state);
    // if (this.state.username && this.state.userId) {
    // if (this.props.isAuth) {
    const user = AuthenticationService.getCurrentUser();
    if (user) {
      console.log("Authenticated");
      // this.props.setAuth(true)
      console.log(this.state);
    } else {
      console.log("Not authorized");
    }
  }
  render() {
    const Component = this.props.component
    let page = "";
    const user = AuthenticationService.getCurrentUser();
    if (user) {
      page = (<Component {...this.props}/>)
    } else {
      console.log("Nothing", user);
      page = (<Redirect to='/login' />)
    }

    // if (this.state.isLoading === true) {
    //   return (<div>Loading</div>)
    // }
    return (
      // <Route render={(props) => this.state.isAuthenticated && !this.state.isLoading ? (<Component {...this.props} />) : (<Redirect to='/login' />)} />
      // <Route render={(props) => this.state.isLogin ? (<Component {...this.props} />) : (<Redirect to='/login' />)} />
      <div>
        {page}
      </div>
    )

  }
}
export default ProtectedRoute;