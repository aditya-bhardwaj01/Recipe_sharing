const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "recipe_sharing"
});

const getUsernames = (username) => {
    console.log(username)
    return new Promise((resolve, reject) => {
        db.query("SELECT username FROM posts WHERE username like ?", [`%${username}%`],
        (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result)
            }
        })
    })
}

const getNames = (name) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT name, username from users where name like ?", [`%${name}%`],
        (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result)
            }
        })
    })
}

router.post('/username', async (req, res) => {
    const username = req.body.searched;

    try{
        const usernames = await getUsernames(username)
        res.json({usernames: usernames});
    } catch(error) {
        res.json({error: "There was a error fetching the result!"});
    }
})

router.post('/name', async (req, res) => {
    const name = req.body.searched;

    try{
        const names = await getNames(name)
        res.json({names: names});
    } catch(error) {
        res.json({error: "There was a error fetching the result!"});
    }
})


module.exports = router