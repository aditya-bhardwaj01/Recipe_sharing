const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "recipe_sharing"
});

const fetchRecipes = (dishtype, recipes) => {
    // console.log(dishtype)
    return new Promise((resolve, reject) => {
        db.query("select * from posts where category=?", [dishtype],
        (err, result) => {
            if(err){
                reject("error");
            }
            else{
                recipes.items = result;
                resolve("success");
            }
        })
    })
}

router.post("/", (req, res) => {
    const dishtype = req.body.dishtype;

    const execute = async () => {
        recipes = {};
        await fetchRecipes(dishtype, recipes)
        .then((result) => {
            console.log(dishtype, recipes)
            res.json(recipes)
        })
        .catch((err) => {
            res.json({error: "There was an error! Please try later"});
        })
    }
    execute()
})

module.exports = router