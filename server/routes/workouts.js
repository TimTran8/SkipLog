const router = require('express').Router();
const Workout = require('../models/workout.model');
let User = require('../models/workout.model');

router.route('/getWorkouts').get((req, res) => {
    Workout.find()
        .then(workouts => res.status(200).json(workouts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const date = req.body.date;
    const time = req.body.time;
    const sets = req.body.sets;
    const minutes = req.body.minutes;
    const seconds = req.body.seconds;

    const newWorkout = new User({
      username,
      date,
      time,
      sets,
      minutes,
      seconds
    });
    console.log(newWorkout);
    newWorkout.save()
        .then(() => res.json('Workout added.').status(200))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;