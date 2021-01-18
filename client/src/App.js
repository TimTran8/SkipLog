import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavbarMenu from './components/NavbarMenu';
import Home from './components/Home';
import Log from './components/Log';
import Profile from './components/Profile';
// import Test from './components/Test';
// import SlideDrawer from './components/SlideDrawer';
// import BackDrop from './components/Backdrop';
// import Card from "react-bootstrap/Card";
// import CardDeck from "react-bootstrap/CardDeck";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";

// function App() {
export default class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     apiResponse: ""
  //   };
  // }
  
  // callAPI() {
  //   fetch("http://localhost:9000/testAPI")
  //     .then(res => res.text())
  //     .then(res => this.setState({ apiResponse: res}));
  // }

  // componentWillMount() {
  //   this.callAPI();
  // }

  // drawerToggleClickHandler = () => {
  //   this.setState({
  //     drawerOpen: !this.state.drawerOpen
  //   })
  // }

  // backdropClickHandler = () => {
  //   this.setState({
  //     drawerOpen: false
  //   })
  // }

  render() {
    // let backdrop;
    // if (this.state.drawerOpen) {
    //   backdrop = <BackDrop close={this.backdropClickHandler}/>;
    // }

    return (
      <Router>
        <div className="App">
          <NavbarMenu />
          {/* <NavbarMenu toggle={this.drawerToggleClickHandler}/> */}
          {/* <Navbar /> */}
          {/* <SlideDrawer show={this.state.drawerOpen}/> */}
          {/* { backdrop } */}
          {/* <div className="content"> */}
          <div className="container">
            <Route path="/" exact component={Home}></Route>
            <Route path="/log" component={Log}></Route>
            <Route path="/profile" component={Profile}></Route>
            {/* <Route path="/stats">{Test}</Route> */}
            {/* <Home toggle={this.drawerToggleClickHandler}/> */}
          </div>
        </div>
      </Router>
    )
  }
}


