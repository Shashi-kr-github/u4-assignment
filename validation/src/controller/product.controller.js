const express = require('express');
const {body, validationResult} = require("express-validator");


const router = express.Router();

const User = require('../models/user.model')

const { check } = require("express-validator");

// router.post(
//   "/user",
//   check("email").custom((value) => {
//     return User.findByEmail(value).then((user) => {
//       if (user) {
//         return Promise.reject("E-mail already in use");
//       }
//     });
//   }),
//   check("password").custom((value, { req }) => {
//     if (value !== req.body.passwordConfirmation) {
//       throw new Error("Password confirmation is incorrect");
//     }
//   }),
//   (req, res) => {
//     // Handle the request somehow
//   }
// );

router.post(
  "/",
  body("id").isLength({ min: 1 }).withMessage("id is requires"),
  body("first_name").isLength({ min: 1 }).withMessage("first_name is requires"),
  body("last_name").isLength({ min: 1 }).withMessage("last_name is requires"),
  body("email").isEmail().withMessage("must be valid email adress"),
  body("ip_adress").isLength({ min: 1 }).withMessage("ip_adress is requires"),
  body("gender").isLength({ min: 3 }).withMessage("gender is required at least 3 caracter"),
  body("age").isLength({ min: 1 , max: 100}).withMessage("age is between 1 to 100"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ data: errors.array() });
    }
    const user = await User.create(req.body);
    return res.status(201).json({ data: user });
  }
);



module.exports = router;