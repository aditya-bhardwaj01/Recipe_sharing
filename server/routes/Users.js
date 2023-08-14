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


/* ---------------------------------  USER REGISTRATION -- USER REGISTRATION --------------------------------- */
let otpPhone = 0, otpEmail = 0;
let name = "", username = "", password = "", phone = "", email = "";

const checkAvailability = (username, phone, email, res) => {
  // console.log(username)
  return new Promise((resolve, reject) => {
    db.query("select * from users where username=? or email=?", [username, email],
      (err, result) => {
        if (err) {
          res.json({ error: "Check your connection or try after sometime." })
        }
        else {
          if (result.length > 0) {
            reject("ERROR");
          }
          else {
            resolve("SUCCESS");
          }
        }
      })
  })
}

const sendOTPtoEmail = async (email, res) => {
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

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({ error: "There was an error sharing the OTP" });
    } else {
      res.json({ success: "OTP sent to you phone and email" });
    }
  });
}

const sendOTPtoPhone = async (phone, email, res) => {
  otpPhone = otpGen.generate(6, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

  var sid = SID;
  var auth_token = AUTH_TOKEN;

  var twilio = require("twilio")(sid, auth_token);

  twilio.messages
    .create({
      from: "+12517583940",
      to: "+91" + phone,
      body: `The OTP for the verification of you recipe sharing application is ${otpPhone}`
    })
    .then(() => {
      sendOTPtoEmail(email, res);
    })
    .catch(() => {
      res.status(500).json({ error: "There was an error sending the OTP!" })
    })

}

const RegisterUser = (res) => {
  bcrypt.hash(password, 10).then((hash) => {
    db.query(
      "INSERT INTO users (username, password, phone, email, name) VALUES (?,?,?,?,?)",
      [username, hash, phone, email, name],
      (err, result) => {
        if (err) {
          res.json({ error: "There was an error registering the user. Please try after sometime." });
        } else {
          res.json({ success: "Successfully registered" });
        }
      }
    );
  });
}

router.post("/register/availability", (req, res) => {
  name = req.body.name;
  username = req.body.username;
  password = req.body.password;
  phone = req.body.phone;
  email = req.body.email;

  const execute = async () => {
    checkAvailability(username, phone, email, res)
      .then(() => {
        sendOTPtoPhone(phone, email, res);
        // sendOTPtoEmail(email, res);
      })
      .catch(() => {
        res.status(200).json({ error: "An account with matching credentials already exist!" });
      })
  }

  execute();
})

router.post("/register/otpverify", (req, res) => {
  const phoneOTP = req.body.phoneOTP;
  const emailOTP = req.body.emailOTP;
  if (phoneOTP !== otpPhone || emailOTP != otpEmail) {
    res.json({ error: "The OTP verification failed!" });
  }
  else {
    RegisterUser(res);
  }
})

/* ---------------------------------  USER REGISTRATION -- USER REGISTRATION --------------------------------- */



/* ---------------------------------  USER LOGIN ----------------- USER LOGIN --------------------------------- */

const verifyPassword = (result, password, res) => {
  const correctPassword = result[0].password;
  const correctUsername = result[0].username;
  bcrypt.compare(password, correctPassword).then(async (match) => {
    if (!match) res.json({ error: "Incorrect Password!" })
    else {
      const accessToken = sign({ username: correctUsername, id: result[0].id }, "youcancomein")
      res.json({
        success: "Logged in",
        accessToken: accessToken
      });
    }
  });
}

const verifyCredentials = (username, password, res) => {
  db.query("select * from users where username = ?", [username],
    (err, result) => {
      if(err) {
        res.json({ error: "Some error! Please try after sometime." })
      }
      else{
        if(result.length === 0){
          res.json({ error: "Username doesn't exist" });
        }
        else{
          verifyPassword(result, password, res);
        }
      }
    })
}

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  verifyCredentials(username, password, res)
})

/* ---------------------------------  USER LOGIN ----------------- USER LOGIN --------------------------------- */

module.exports = router;
