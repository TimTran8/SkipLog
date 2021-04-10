const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // check JWT exists & is verified
  if (token) {
    jwt.verify(token, 'skiplog secret', (err, decodedToken) => {
      if (err) {
        console.log('error verifying, redirecting', err.message);
        // res.redirect('http://localhost:3000/login')
        
      } else {
        console.log(decodedToken);
        next();
      }
    })
  } else {
    console.log("No token, redirecting");
    // res.redirect('http://localhost:3000/login');
  }
}

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("Checking user");
  if (token) {
    jwt.verify(token, 'skiplog secret', async (err, decodedToken) => {
      if (err) {
        console.log('error verifying', err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    })
  } else {
    res.locals.user = null;
    next();
  }
}

module.exports = { requireAuth, checkUser };