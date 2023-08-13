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

router.post("/register", (req, res) => {
  const username = req.body.username
  const phone = req.body.phone
  const email = req.body.email
  
  res.json({ success: "success" })
})

router.post("/login", (req, res) => {
  res.json({ success: "success" })
})

module.exports = router;
