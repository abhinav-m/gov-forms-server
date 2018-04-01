const express = require('express');

const usersController = require('../controllers/usersController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/me', authenticate, (req, res) => {
  res.send(req.user);
});

// Signup route
router.post('/signup', usersController.signup);

router.post('/login', usersController.login);

router.delete('/logout', authenticate, usersController.logout);

module.exports = router;
