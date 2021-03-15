const express = require('express');
const cors = require('cors'); // Cross-Origin Resource Sharing
const mongoose = require('mongoose'), Admin = mongoose.mongo.Admin; // TODO: remove later

const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const usersRouter = require('./routes/users');
const workoutsRouter = require('./routes/workouts');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const app = express();

const port = process.env.PORT || 5000;
require('dotenv').config();

// middleware
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(cookieParser());

// const uri = 'mongodb+srv://admin:skiplog123@skiplog.db6ma.mongodb.net/Skiplog?retryWrites=true&w=majority';
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port);
    console.log(`Listening at http://localhost:${port}`);
  })
  .catch((err) => console.log(err));

// routes
app.use(authRoutes);
// app.get('*', checkUser);
app.use('/login', requireAuth, authRoutes);
app.use('/users', requireAuth, usersRouter);
app.use('/workouts', requireAuth, workoutsRouter);
// app.use('/workouts', workoutsRouter);
// app.use('/workouts', (req, res) => workoutsRouter);
app.get('/', (req, res) => {
  res.send('Hello, World!')
})
// backend routes redirect, fix front-end redirects