import React, { Component } from "react";
import { DatePicker, TimePicker } from 'antd';
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
// import moment from 'moment';
import 'antd/dist/antd.css';
import axios from 'axios';
export default class Log extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      username: '',
      date: '',
      time: '',
      sets: '0',
      minutes: '0',
      seconds: '0',
      users: []
    };

    this.state = this.initialState;

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleChangeSets = this.handleChangeSets.bind(this);
    this.handleChangeMinutes = this.handleChangeMinutes.bind(this);
    this.handleChangeSeconds = this.handleChangeSeconds.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    //  axios.get('http://localhost:5000/testUsersAxios')
    this.fetchUsers();
    // this.setState({ time: moment('00:00:00', 'HH:mm:ss')})
    // this.setState({ time: moment()})
    // this.setState({ date: moment()})
  }

  fetchUsers = (e) => {
    axios.get('http://localhost:5000/users/getUsers')
      .then(res => {
        // console.log('data:\n', res.data);
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

  handleChangeDate = (date, dateString) => {
    console.log(date, dateString);

    this.setState({ date: dateString });
  }

  handleChangeTime = (time, timeString) => {
    console.log(time, timeString);
    this.setState({ time: timeString });
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

  resetForm = (e) => {
    console.log(this.state);
    this.setState(() => this.initialState);
    this.fetchUsers();
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

    if (workout.username === '' || workout.username === 'Select user...') {
      alert("Username cannot be empty!");
      return;
    }
    if (workout.date === '') {
      alert("Date cannot be empty!");
      return;
    }
    if (workout.time === '') {
      alert("Time cannot be empty!");
      return;
    }

    axios.post('http://localhost:5000/workouts/add', workout)
      .then(res => console.log(res.data))
      .catch(e => console.log(e));

    console.log("Submitting:", workout);
    alert('Submitted');
    this.resetForm();
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
                  <Col xs="3">
                    {/* <DatePicker onChange={this.handleChangeDate} value={this.state.date} /> */}
                    {/* <DatePicker onChange={(date, dateString) => this.handleChangeDate(date, dateString)} value={this.state.date} ></DatePicker> */}
                    <DatePicker onChange={(date, dateString) => this.handleChangeDate(date, dateString)} ></DatePicker>
                    <Form.Label>Date</Form.Label>
                  </Col>
                  <Col xs="3">
                    <TimePicker onChange={(time, timeString) => this.handleChangeTime(time, timeString)} />
                    {/* <TimePicker onChange={(time, timeString) => this.handleChangeTime(time, timeString)} value={this.state.time} /> */}
                    {/* <TimePicker onChange={this.handleChangeTime} value={this.state.time} defaultValue={moment('00:00:00', 'HH:mm:ss')} /> */}
                    <Form.Label>Time</Form.Label>
                  </Col>
                </Form.Row>
              </Form.Group>
              <Form.Group>
                <Form.Row className=" justify-content-center text-center">
                  <Col xs="3">
                    <Form.Control onChange={this.handleChangeSets} value={this.state.sets} type="number" min="0" placeholder="00" />
                    <Form.Label>Number of sets</Form.Label>
                  </Col>
                  <h2>x</h2>
                  <Col xs="3">
                    <Form.Control onChange={this.handleChangeMinutes} value={this.state.minutes} type="number" min="0" placeholder="00" />
                    <Form.Label>Minutes</Form.Label>
                  </Col>
                  <h2>:</h2>
                  <Col xs="3">
                    <Form.Control onChange={this.handleChangeSeconds} value={this.state.seconds} type="number" min="0" max="59" placeholder="00"/>
                    <Form.Label>Seconds</Form.Label>
                  </Col>
                </Form.Row >
              </Form.Group>
              <Row className=" justify-content-center text-center mb-2">
                <Col><Button variant="danger" type="button" onClick={this.resetForm}>Clear</Button></Col>
                <Col><Button variant="primary" type="submit">Submit</Button></Col>
              </Row>
            </Form>
          </Card>
        </Container>
      </div>
    )
  }
}
