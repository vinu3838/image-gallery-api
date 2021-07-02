const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
    signUpUser,
    loginUser,
} = require('../controllers/user');


router.post('/signUp',
[
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('name')
      .trim()
      .not()
      .isEmpty()
  ], signUpUser);
router.post('/login', loginUser);

module.exports = router;
