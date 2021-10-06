const express = require('express');

const nodemailer = require('nodemailer');
require("dotenv").config();

const router = express.Router();
const User = require("../models/user.model");

const {CURRENT_ENVIRONMENT, SMTP_USERNAME, SMTP_PASSWORD} = process.env;

router.get("/" , async (req,res) => {
    const page =  +req.query.page || 1;
    const size = +req.query.limit || 10;
    //console.log(page,size)
    const offset = (page-1)*size;
    const users = await User.find({gender:{$eq: "Male"}}).skip(offset).limit(10).lean().exec();

    const totalPages = Math.ceil(await User.find({ gender: { $eq: "Male" } }).countDocuments().lean().exec())/size;
  //  console.log(totalPages);

    var message = {
      from: "shashi@masaischool.com",
      to: "receiver@sender.com",
      subject: "Message title",
      text: "Plaintext version of the message",
      html: "<h1>HTML version of the message</h1>"
    };

 const transporter = nodemailer.createTransport({
   host:CURRENT_ENVIRONMENT == "development" ? "smtp.mailtrap.io" : "",
   port: 587,
   secure: false, // upgrade later with STARTTLS
   auth: {
     user: SMTP_USERNAME,
     pass: SMTP_PASSWORD,
   },
 });

  transporter.sendMail(message)




    res.status(200).json({data:{users,totalPages}})
})

module.exports = router;        