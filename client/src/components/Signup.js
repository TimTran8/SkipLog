import React, { Component } from "react";
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      emailError: "We'll never share your email with anyone else.",
      passwordError: ''
    }
    this.state = this.initialState;

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordError = this.handleChangePasswordError.bind(this);
    this.handleChangeEmailError = this.handleChangeEmailError.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  handleChangeUsername = (e) => {
    let name = e.target.value;
    if (name.indexOf(' ') !== -1) {
      //string contains only whitespace
      alert("Username cannot contain whitespaces");
      return;
    }

    this.setState({ username: e.target.value });
  }

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  handleChangeEmailError = (data) => {
    this.setState({ emailError: data });
  }
  
  handleChangePasswordError = (e) => {
    this.setState({ passwordError: e.target.value });
  }

  handleChangeFirstName = (e) => {
    this.setState({ firstName: e.target.value });
  }

  handleChangeLastName = (e) => {
    this.setState({ lastName: e.target.value });
  }

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  handleClear = (e) => {
    console.log("Before clear", this.state);
    this.setState(() => this.initialState);
    // this.setState({
    //   username: '',
    //   firstName: '',
    //   lastName: '',
    //   email: ''
    // });
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

    console.log(user);
    await axios.post('http://localhost:5000/signup/add', user, { withCredentials: true })
      .then(res => console.log(res.data))
      .catch(e => {
        if (e.response) {
          console.log(e.response.data.errors.email);
          this.handleChangeEmailError(e.response.data.errors.email);
        } else {
          this.handleChangeEmailError(this.initialState.emailError);
        }
      });
    alert("Submitted!");
    console.log("Submitting");
  }

  render() {

    return (
      <div>
        <Container>
          <Card className="mt-5 pl-5 pr-5">
            <h2 style={{ textAlign: "center" }}>Profile</h2>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formGroupUsername">
                <Form.Row className="justify-content-center align-items-center text-center">
                  <Col md="5" className="my-1">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={this.handleChangeUsername} className="mr-sm-2" type="name" placeholder="Username" value={this.state.username} />
                  </Col>
                </Form.Row>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} />
                <Form.Text className="text-muted" value={this.state.passwordError}>
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control  onChange={this.handleChangeEmail} type="email" placeholder="Enter email" />
                <Form.Text className="text-muted" value={this.state.emailError}>{this.state.emailError}
                </Form.Text>
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col} controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control value={this.state.firstName} onChange={this.handleChangeFirstName} type="name" placeholder="First name" />
                </Form.Group>
                <Form.Group as={Col} controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control value={this.state.lastName} onChange={this.handleChangeLastName} type="name" placeholder="Last name" />
                </Form.Group>
              </Form.Row>
              <Row className=" justify-content-center text-center mb-2">
                <Col><Button onClick={this.handleClear} variant="danger" type="button">Clear</Button></Col>
                <Col><Button variant="primary" type="submit">Submit</Button></Col>
              </Row>
            </Form>
          </Card>
        </Container>
      </div>
    )
  }
}

export default Signup;
