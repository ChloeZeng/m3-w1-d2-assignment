const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', function (req, res) {
  res.render('form', { title: 'Registration form', data: {} });
});

router.post(
  '/',
  [
    check('name')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Please enter a name'),
    check('email')
      .trim()
      .isEmail()
      .withMessage('Please enter an email')
  ],
  (req, res) => {
    const errors = validationResult(req);
    const data = req.body;

    if (!errors.isEmpty()) {
      return res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: data
      });
    }
    res.render('form', {
      title: 'Registration form',
      data: {},
      message: `Thank you, ${data.name}! We received your email (${data.email}).`
    });
  }
);
module.exports = router;