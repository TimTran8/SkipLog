import React, { Component } from "react";
// import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Redirect, Route } from "react-router-dom";

class ProtectedRoute extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      isLoading: true
    }
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  componentDidMount() {
    this.isAuthenticated()
  }

  isAuthenticated() {
    const url = 'http://localhost:5000/auth'
    // fetch(url, {
    //   method: 'GET',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    console.log("Authenticating");
    this.props.getAuth;
    if (this.props.isAuthenticated) {
      console.log("Authenticated");
      this.setState({
        isAuthenticated: true,
        isLoading: false
      })
    } else {
      console.log("Not authorized");
    }
    // axios.get(url, { withCredentials: true })
    //   .then((response) => response.text())
    //   .then((data) => {
    //     if (data === 'true') {
    //       this.setState({
    //         isAuthenticated: true,
    //         isLoading: false
    //       })
    //     } else {
    //       this.setState({
    //         isAuthenticated: false,
    //         isLoading: false
    //       })
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('Error', err)
    //   })
  }
  render() {
    const Component = this.props.component
    // if (this.state.isLoading === true) {
    //   return (<div>Loading</div>)
    // }
    return (
      <Route render={(props) => this.state.isAuthenticated && !this.state.isLoading ? (<Component {...this.props} />) : (<Redirect to='/login' />)} />
    )

  }
}
export default ProtectedRoute;