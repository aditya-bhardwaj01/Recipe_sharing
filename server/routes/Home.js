const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "recipe_sharing"
});

const getProfilePic = (item) => {
    return new Promise((resolve, reject) => {
        db.query("Select profile_pic from userdetails where username=?", [item.username], (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const fetchRecipes = (dishtype) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT id, title, photo, username, rating, payment FROM posts WHERE category=?", [dishtype], async (err, result) => {
            if (err) {
                reject(err);
            } else {
                for(var i = 0; i<result.length; i++){
                    try{
                        const profile_pic = await getProfilePic(result[i]);
                        result[i].profile_pic = profile_pic[0].profile_pic;
                    }
                    catch{
                        reject(err);
                    }
                }
                resolve(result);
            }
        });
    });
};

router.post("/", async (req, res) => {
    const dishtype = req.body.dishtype;

    try {
        const result = await fetchRecipes(dishtype);
        res.json({ items: result });
    } catch (error) {
        res.json({ error: "There was an error! Please try later" });
    }
})

module.exports = router