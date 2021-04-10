const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/signup', authController.signup_get);
router.post('/signup/add', authController.signup_post);
// router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.put('/logout', authController.logout_put);
router.get('/logout', authController.logout_get);
router.get('/auth', authController.auth_get);
// router.get('/authUser', authController.auth_get);
// router.post('/testAuth', authController.testAuth_post);
router.get('/testAuth', authController.testAuth_get);
router.get('/testAuthRemove', authController.testAuth_remove);

router.route('/getUsers').get((req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
