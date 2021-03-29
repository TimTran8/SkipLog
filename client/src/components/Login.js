import React, { Component } from "react";
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
// import axios from 'axios';
import AuthenticationService from "./AuthenticationService";
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: ''
    }
    // this.state = this.initialState;
    
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleClear = (e) => {
    console.log("Before clear", this.state);
    this.setState({
      username: '',
      firstName: '',
      lastName: '',
      email: ''
    });
    console.log("Cleared", this.state);
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    }
    if (user.username === '') {
      alert("Username cannot be empty!");
      return;
    }

    // const emailError = '';
    // const passwordError = '';

    console.log('heres user:', user);
    AuthenticationService.signin(this.state.username, this.state.password)
      .then(() => {
        console.log("Logging in and redirecting");
        this.props.setAuth(true);
        window.location = "/workouts";
        // this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      })
    // old way
    // await axios.post('http://localhost:5000/login', user, { withCredentials: true })
    //   .then(res => {
    //     console.log(res.data);
    //     console.log("Redirecting");
    //     console.log("Cookie:", res.cookie);
    //     this.props.setAuth(true);
    //     // this.props.getAuth();
    //     console.log(res.data);
    //     if (res.data) {
    //       localStorage.setItem("token", "Bearer " + res.data.token);
    //       localStorage.setItem("user", JSON.stringify(res.data));
    //     }
    //     window.location = "/workouts";
    //     // this.props.history.push('/workouts')
    //   })
    //   // redirect to home
    //   .catch(e => {
    //     console.log(e); 
    //     // add errors to the DOM
    //   });
  }

  render() {

    return (
      <div>
        <Container>
          <Card className="mt-5 pl-5 pr-5">
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formGroupUsername">
                <Form.Row className="justify-content-center align-items-center text-center">
                  <Col md="5" className="my-1">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" onChange={this.handleChange} className="mr-sm-2" type="name" placeholder="Username" value={this.state.username} />
                  </Col>
                </Form.Row>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange} />
              </Form.Group>
              <Row className=" justify-content-center text-center mb-2">
                <Col><Button onClick={this.handleClear} variant="danger" type="button">Clear</Button></Col>
                <Col><Button variant="primary" type="submit">Login</Button></Col>
              </Row>
            </Form>
          </Card>
        </Container>
      </div>
    )
  }
}

export default withRouter( Login);
