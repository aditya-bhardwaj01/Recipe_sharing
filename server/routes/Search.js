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
    return new Promise((resolve, reject) => {
        db.query("SELECT username FROM users WHERE username like ?", [`%${username}%`],
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
        db.query("SELECT distinct name from users where name like ?", [`%${name}%`],
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

const getRecipeNames = (recipename) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT distinct title from posts where title like ?", [`%${recipename}%`],
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

const getRecipeTypes = (recipetype) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT distinct category from posts where category like ?", [`%${recipetype}%`],
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
    const username = req.body.search;

    try{
        const usernames = await getUsernames(username)
        res.json({result: usernames});
    } catch(error) {
        res.json({error: "There was a error fetching the result!"});
    }
})

router.post('/name', async (req, res) => {
    const name = req.body.search;

    try{
        const names = await getNames(name)
        res.json({result: names});
    } catch(error) {
        res.json({error: "There was a error fetching the result!"});
    }
})

router.post('/recipename', async (req, res) => {
    const recipename = req.body.search;

    try{
        const recipenames = await getRecipeNames(recipename);
        res.json({result: recipenames})
    }
    catch(error){
        res.json({error: "There was a error fetching the result!"});
    }
})

router.post('/recipetype', async (req, res) => {
    const recipetype = req.body.search;

    try{
        const recipetypes = await getRecipeTypes(recipetype);
        res.json({result: recipetypes})
    }
    catch(error){
        res.json({error: "There was a error fetching the result!"});
    }
})


module.exports = router