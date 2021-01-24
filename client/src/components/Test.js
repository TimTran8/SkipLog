import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: '',
      post: '',
      responseToPost: '',
    };
  };

  componentDidMount() {
    console.log('componentDidMount');
    this.callAPI()
      .then(res => {
        console.log('Response:', res);
        this.setState({ response: res.express });
      }
      )
      .catch(err => console.log("ERROR:", err));
  }

  callAPI = async () => {
    const response = await fetch('http://localhost:5000/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {

    return (
      <div>
        <h2>Profile</h2>

        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    )
  }
}

export default Test;
