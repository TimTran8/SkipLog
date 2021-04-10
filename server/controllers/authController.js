const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: '', password: '', email: '' };

  if (err.message === 'incorrect username') {
    errors.username = 'That username is not registered';
  }

  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'That email already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    })
  }
  console.log(errors);
  return errors;
}


module.exports.signup_get = (req, res) => {
  console.log("signup_get");
  // res.render('signup');
}

module.exports.login_get = (req, res) => {
  // res.render('login');

  console.log("login_get");
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'skiplog secret', {
    expiresIn: maxAge
  });
};

module.exports.signup_post = async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;

  try {
    const user = await User.create({ username, password, email, firstName, lastName });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch (err) {
    const errors = handleErrors(err);
    console.log('errors return:', errors);
    res.status(400).send({ errors });
  }
}

module.exports.login_post = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    console.log("New token:", token);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    // res.cookie('newToken', token, { httpOnly: true, maxAge: 10000 });
    // console.log("Created cookie:", res.cookie.jwt);
    // res.status(200).json({ user: user._id, token: token });
    res.status(200).send({
      accessToken: token,
      token: token,
      username: username,
      userId: user._id 
    });
  }
  catch (err) {
    console.log('failed to login controller');
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.logout_put = (req, res) => {
  // console.log('Removing cookie:', res.cookie);
  // console.log('req', req);
  try {
    res.cookie('jwt', '', { maxAge: 1 });
    res.sendStatus(200);
  }
  catch (err) {
    console.log("Couldn't remove token");
    res.status(err);
  }
}

module.exports.logout_get = (req, res) => {
  console.log('Removing token');
  // console.log('req', req.cookie);
  // console.log('res', res.cookie);
  // res.cookie('jwt', '', { maxAge: 1 });
  res.clearCookie('jwt');
  // res.cookie('jwt', 'none', {expiresIn: new Date(Date.now() + 5*1000), httpOnly: true})
  // res.cookie('jwt', '', { expiresIn: new Date(0) });
  // res.sendStatus(200);
  res.status(200).json({ success: true, message: 'Logout success'})
  // res.redirect('http://localhost:3000');
}

module.exports.auth_get = (req, res, next) => {
  // console.log('req', req);
  // console.log('res', res);

  // if (req.session.username) {
  //   res.send(true);
  // } else {
  //   res.send(false);
  // }
  // console.log(res);
  res.sendStatus(200);
}

// module.exports.testAuth_post = (req, res) => {
module.exports.testAuth_get = (req, res) => {
  res.cookie('new', 'blah123get', { 
    maxAge: 1000,
    httpOnly: true
  });

  console.log("Created new cookie");
  res.sendStatus(200);
}

module.exports.testAuth_remove = (req, res) => {
  // res.cookie('new', 'serasdfasdf', {maxAge: 10000});
  res.clearCookie('new');
  // console.log("Removed new cookie");
  res.sendStatus(200);
}