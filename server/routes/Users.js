const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const otpGen = require("otp-generator");
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken');
const { EMAIL, PASSWORD, SID, AUTH_TOKEN } = require("./env");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "recipe_sharing"
});

let otpPhone = 0, otpEmail = 0;

const checkAvailability = (username, phone, email, res) => {
  // console.log(username)
  return new Promise((resolve, reject) => {
    db.query("select * from users where username=? or email=?", [username, email],
      (err, result) => {
        if (err) {
          res.json({ error: "Check your connection or try after sometime." })
        }
        else {
          if(result.length > 0){
            reject("ERROR");
          }
          else{
            resolve("SUCCESS");
          }
        }
      })
  })
}

const sendOTPtoEmail = async (email, res) => {
  // ------------- FOR EMAIL ------------ //
  otpEmail = otpGen.generate(6, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false }); 
  var nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD
    }
  });

  var mailOptions = {
    from: EMAIL,
    to: email,
    subject: "OTP for creating account on Recipe Sharing",
    html: 
    `<!DOCTYPE html><html lang="en"><head><title>User response</title></head><body>OTP for Recipe Sharing application is ${otpEmail}</body></html>`
  };
  
  await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.json({error: "There was an error sharing the OTP"});
    } else {
      res.json({success: "OTP sent to you phone and email"});
    }
  });
}

const sendOTPtoPhone = async (phone, email, res) => {
  // ------------- FOR PHONE ------------ //
  otpPhone = otpGen.generate(6, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });  

  var sid = SID;
  var auth_token = AUTH_TOKEN;

  var twilio = require("twilio")(sid, auth_token);
  // ------------- FOR PHONE ------------ //

  twilio.messages
    .create({
      from: "+12517583940",
      to: "+91"+phone,
      body: `The OTP for the verification of you recipe sharing application is ${otpPhone}`
    })
    .then(() => {
      sendOTPtoEmail(email, res);
    })
    .catch(() => {
      res.status(500).json({error: "There was an error sending the OTP!"}) 
    })

}

router.post("/register/availability", (req, res) => {
  const username = req.body.username;
  const phone = req.body.phone;
  const email = req.body.email;

  const execute = async () => {
    checkAvailability(username, phone, email, res)
      .then(() => {
        sendOTPtoPhone(phone, email, res);
      })
      .catch(() => {
        res.status(200).json({ error: "An account with matching credentials already exist!" });
      })
  }

  execute();
})

router.post("/login", (req, res) => {
  res.json({ success: "success" })
})

module.exports = router;
