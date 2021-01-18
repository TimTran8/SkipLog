import React, { Component } from "react";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiResponse: ""
    };
  };

  callAPI() {
    fetch("http://localhost:5000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    console.log('calling api');
    this.callAPI();
  }

  render() {

    return (
      <div>
        <h2>Profile</h2>
        <p>{this.state.apiResponse}</p>
      </div>
    )
  }
}

// const Profile = (props) => {
//   return ( 
//     <div>
//       <h2>Profile</h2>
//     </div>
//    );
// }

export default Profile;
