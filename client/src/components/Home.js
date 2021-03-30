
import React, { Component } from 'react';
import './componentStyles/Home.css'
// import { Table, Button, Container, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
// import axios from 'axios';
// import NavbarMenu from './NavbarMenu';

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        {/* <NavbarMenu></NavbarMenu> */}
        <h1>Home</h1>
        <h2>Welcome to Skiplog</h2>
      </div>
    )

  }
}