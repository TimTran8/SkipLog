import React, { Component } from 'react';
import './componentStyles/Home.css'
import { Table, Button, Container, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Timer from './Timer';

const Workout = props => (

  <tr>
    <td>{props.workouts.username}</td>
    <td>{props.workouts.date}</td>
    <td>{props.workouts.time}</td>
    <td>{props.workouts.sets}</td>
    <td>{props.workouts.minutes}</td>
    <td>{props.workouts.seconds}</td>
    {/* <td>{props.workouts.date.substring(0, 10)}</td> */}
    {/* <td>
          <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</a>
        </td> */}
    <td><Button xs="1">Edit</Button></td>
  </tr>
)

// const Workouts = (props) => {
export default class Workouts extends Component {
  constructor(props) {
    super(props);

    this.deleteWorkout = this.deleteWorkout.bind(this);

    this.state = { workouts: [] };
  }

  componentDidMount() {
    console.log(this.props);
    axios.get('http://localhost:5000/workouts/workouts', { withCredentials: true })
      .then(res => {
        console.log(res.data);
        this.setState({ workouts: res.data })
      })
      .catch((error) => {
        console.log("Can't get workouts", error);
      })
  }

  deleteWorkout(id) {
    axios.delete('http://localhost:5000/workouts/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      workouts: this.state.workouts.filter(el => el._id !== id)
    })
  }

  workoutLog() {
    console.log(this.state.workouts);
    return this.state.workouts.map(currLog => {
      return <Workout workouts={currLog} deleteWorkout={this.deleteWorkout} key={currLog._id}></Workout>;
    })
  }

  render() {
    return (
      <div className="home">
        <Container>
          <Card className="mt-5 pl-5 pr-5 pt-3">
            <h2 style={{ textAlign: "center" }}>Workouts</h2>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Sets</th>
                  <th>Minutes</th>
                  <th>Seconds</th>
                </tr>
              </thead>
              <tbody>
                {this.workoutLog()}
              </tbody>
            </Table>
          </Card>
        </Container>
      </div>
    )

  }
}

// export default Workouts;
