const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.json({ error: "Database error" })
})

module.exports = router;
