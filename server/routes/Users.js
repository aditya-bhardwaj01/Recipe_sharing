const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const { sign } = require('jsonwebtoken');

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "recipe_sharing"
});

const checkAvailability = (username, phone, email, res) => {
  // console.log(username)
  return new Promise((resolve, reject) => {
    db.query("select * from users where username=? or phone=? or email=?", [username, phone, email],
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

router.post("/register/availability", (req, res) => {
  const username = req.body.username;
  const phone = req.body.phone;
  const email = req.body.email;

  const execute = async () => {
    checkAvailability(username, phone, email, res)
      .then((result) => {
        // console.log(result)
        // sendOTP();
        res.status(200).json({ success: "OTP sent to you phone and email!" });
      })
      .catch((err) => {
        // console.log(err)
        res.status(200).json({ error: "An account with matching credentials already exist!" });
      })
  }

  execute();
})

router.post("/login", (req, res) => {
  res.json({ success: "success" })
})

module.exports = router;
