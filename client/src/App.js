import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavbarMenu from './components/NavbarMenu';
import Workouts from './components/Workouts';
import Log from './components/Log';
import Profile from './components/Profile';
// import Test from './components/Test';
// import SignIn from './components/SignIn';
// import Test from './components/Test';
// import SlideDrawer from './components/SlideDrawer';
// import BackDrop from './components/Backdrop';
// import Card from "react-bootstrap/Card";
// import CardDeck from "react-bootstrap/CardDeck";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";

export default class App extends React.Component {
  
  render() {

    return (
      <Router>
        <div className="App">
          <NavbarMenu />
          <div className="container">
            {/* <Route path="/" exact component={SignIn}></Route> */}
            <Route path="/" exact component={Workouts}></Route>
            <Route path="/log" component={Log}></Route>
            <Route path="/profile" component={Profile}></Route>
          </div>
        </div>
      </Router>
    )
  }
}


