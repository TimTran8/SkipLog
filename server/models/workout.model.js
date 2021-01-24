const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  minutes: {
    type: Number,
    required: true
  },
  seconds: {
    type: Number,
    required: true
  }
},
  {
    timestamps: true,
  });

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;