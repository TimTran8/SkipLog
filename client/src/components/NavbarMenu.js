import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const NavbarMenu = (props) => {
  return (
    <Navbar className="navbar" collapseOnSelect expand="sm" >
    {/* <Navbar className="navbar" collapseOnSelect > */}
      <h1 href="/">Skip Log</h1>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {/* <Link to="/">Home</Link> */}
          <Link to="/">Workouts</Link>
          <Link to="/log">Log</Link>
          <Link to="/profile">Profile</Link>
          {/* <Link to="/stats">Stats</Link> */}
        </Nav>
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
  );
}

export default NavbarMenu;