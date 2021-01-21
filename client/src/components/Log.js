import React, { Component } from "react";
import { DatePicker, TimePicker } from 'antd';
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';
import 'antd/dist/antd.css';
import axios from 'axios';
export default class Log extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      date: '',
      time: '',
      sets: '',
      minutes: '',
      seconds: '',
      users: []
    };

    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleChangeSets = this.handleChangeSets.bind(this);
    this.handleChangeMinutes = this.handleChangeMinutes.bind(this);
    this.handleChangeSeconds = this.handleChangeSeconds.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    /*
    axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState ({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    */
  //  fetch('http://localhost:5000/testUsersFetch')
  // .then(res => {
  //   if (!res.ok) {
  //     throw Error('Could not fetch data');
  //   }
  //   return res.json();
  // })
   axios.get('http://localhost:5000/testUsersAxios')
      .then(res => {
        console.log('data:\n', res.data);
        this.setState({
          users: res.data.map(user => user.username),
          username: res.data[0].username
        })
      })
      .catch((e) => {
        console.log('error msg: ' + e);
      });
  }

  handleChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  }

  handleChangeDate = (e) => {
    this.setState({ date: e.target.value });
  }

  handleChangeTime = (e) => {
    this.setState({ time: e.target.value });
  }

  handleChangeSets = (e) => {
    this.setState({ sets: e.target.value });
  }

  handleChangeMinutes = (e) => {
    this.setState({ minutes: e.target.value });
  }

  handleChangeSeconds = (e) => {
    this.setState({ seconds: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const workout = { 
      username: this.state.username,
      date: this.state.date,
      time: this.state.time,
      minutes: this.state.minutes,
      seconds: this.state.seconds,
      sets: this.state.sets
    }

    axios.post('http://localhost:5000/')

    alert('Submitted: ' + this.state.value);
  }

  render() {
    return (
      <div>
        <Container>
          <Card className="mt-5">
            <Form onSubmit={this.handleSubmit} ref={this.formRef} className="mt-3">
              <h2 style={{ textAlign: "center" }}>Log Workout</h2>
              <br />
              <Form.Group>
                <Form.Row className="justify-content-center align-items-center text-center">
                  <Col md="5" className="my-1">
                    <Form.Control
                      as="select"
                      className="mr-sm-2"
                      id="inlineFormCustomSelect"
                      custom
                      onChange={this.handleUsername}
                    >
                      <option>Select user...</option>
                      {
                        this.state.users.map((user) => {
                          return <option
                            key={user}
                            value={user}>{user}
                          </option>;
                        })
                      }
                    </Form.Control>
                    <Form.Label className="mr-sm-2">User</Form.Label>
                  </Col>
                  {/* <Col xs="auto" className="my-1">
                    <Form.Check
                      type="checkbox"
                      id="customControlAutosizing"
                      label="Remember my preference"
                      custom
                    />
                  </Col> */}
                </Form.Row>
              </Form.Group>
              <Form.Group>
                <Form.Row className=" justify-content-center text-center">
                  <DatePicker onChange={this.handleChangeDate} />
                  <TimePicker onChange={this.handleChangeTime} defaultValue={moment('00:00:00', 'HH:mm:ss')} />
                </Form.Row>
              </Form.Group>
              <Form.Group>
                <Form.Row className=" justify-content-center text-center">
                  <Col xs="3">
                    <Form.Control onChange={this.handleChangeSets} type="number" min="0" placeholder="00" />
                    <Form.Label>Number of sets</Form.Label>
                  </Col>
                  <h2>x</h2>
                  <Col xs="3">
                    <Form.Control onChange={this.handleChangeMinutes} type="number" min="0" placeholder="00" />
                    <Form.Label>Minutes</Form.Label>
                  </Col>
                  <h2>:</h2>
                  <Col xs="3">
                    <Form.Control onChange={this.handleChangeSeconds} type="number" min="0" max="59" placeholder="00" />
                    <Form.Label>Seconds</Form.Label>
                  </Col>
                </Form.Row >
              </Form.Group>
            </Form>
            <Row className=" justify-content-center text-center mb-2">
              <Col><Button variant="danger" type="submit" onClick={this.resetForm}>Clear</Button></Col>
              <Col><Button variant="primary" type="submit">Submit</Button></Col>
            </Row>
          </Card>
        </Container>
      </div>
    )
  }
}
