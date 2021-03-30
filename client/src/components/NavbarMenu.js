import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthenticationService from './AuthenticationService';
import React from "react";
// import { useState } from 'react';


// const NavbarMenu = (props) => {
class NavbarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      username: undefined
    }
  }
  // const [login, setLogin] = useState(false);

  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();

    if (user) {
      this.setState({
        login: true,
        username: user.username
      });
    }
  }

  render() {
    const user = AuthenticationService.getCurrentUser();
    

    const handleLogout = (e) => {
      console.log("Logging out");
      axios.put('http://localhost:5000/logout', { hello: 'world' }, { withCredentials: true })
        .then(res => {
          console.log(res.data);
          console.log("Redirecting");
          localStorage.clear();
          // this.props.history.push('/')
        })
      this.setState({
        login: false,
        username: undefined
      });
      //   .catch((err) => console.log(err));
      // e.preventDefault()
      // localStorage.removeItem('jwt');
      // console.log("Log out");
    }

    return (
      <Navbar className="navbar" collapseOnSelect expand="sm" >
        <h1 href="/">Skip Log</h1>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" /> <Navbar.Collapse id="responsive-navbar-nav"> {this.state.login ? (
          <Nav className="ml-auto">
            {/* <Link to="/">Home</Link> */}
            <Link to="/">Home</Link>
            <Link to="/log">Log</Link>
            <Link to="/workouts">Workouts</Link>
            {/* <Link to="/profile">Profile</Link> */}
            <Link to="/login" onClick={handleLogout}>Logout</Link>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            {/* <Link to="/">Home</Link> */}
            <Link to="/">Home</Link>
            {/* <Link to="/workouts">Workouts</Link> */}
            {/* <Link to="/log">Log</Link> */}
            {/* <Link to="/profile">Profile</Link> */}
            <Link to="/login">Login</Link>
            {/* <Link to="/login" onClick={handleLogout}>Logout</Link> */}
            {/* <Link to="/stats">Stats</Link> */}
          </Nav>
        )
        }
        </Navbar.Collapse>
      </Navbar>
      // <nav className="navbar">
      //   <button className="navbar-slide" toggle={props.drawerToggleClickHandler}>Profile</button>
      //   <h1>Skip Log</h1>
      //   <div className="links">
      //     <div>
      //       <a href="/">Home</a>
      //       <a href="/create" style={{
      //         color: "white",
      //         backgroundColor: '#f1356d',
      //         borderRadius: '8px'
      //       }}>New Log</a>
      //     </div>
      //   </div>
      // </nav>
    )
  }
}

export default NavbarMenu;