import GoogleLogin from 'react-google-login';
import React, { Component } from 'react';

const handleLogin = async googleData => {
  const res = await fetch("/api/v1/auth/google", {
    method: "POST",
    body: JSON.stringify({
      token: googleData.tokenId
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })  
  
  const data = await res.json()
  // store returned user somehow
}

export default class SignIn extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {

  //   }
  // }

  componentDidMount() {
    fetch(`http://localhost:5000/`)
    .then((res) => res.json())
    .then((data) => console.log(data))
  }  
  
  handleFetchGoogle() {
    fetch(`http://localhost:5000/`)
    .then((res) => res.json())
    .then((data) => console.log(data))

  }

  render() {
    return (
      <GoogleLogin
        clientId={this.handleFetchGoogle}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
      />
    )
  }
}