const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const { verify } = require("jsonwebtoken");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "recipe_sharing"
});

const fetchItemSpec = (item_id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM posts WHERE id=?`, [item_id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

const isAuthorized = (postId, userId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT id FROM payment WHERE buyer_id=? AND post_id=? UNION SELECT id FROM posts WHERE id=? AND userid=?", 
        [userId, postId, postId, userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                if(result.length > 0){
                    resolve({canSee: true});
                }
                else{
                    resolve({canSee: false});
                }
            }
        });
    });
}

const getRecipe = (postId) => {
    return "This is the recipe";
}

router.post("/itemDetails", async (req, res) => {
    const item_id = req.body.item_id
    try {
        const result = await fetchItemSpec(item_id);
        res.json({ item: result });
    }
    catch (error) {
        res.json({ error: "There was some error fetching the result!!" })
    }
})

router.post("/getRecipe", async (req, res) => {
    const accessToken = req.body.accessToken;
    const validToken = verify(accessToken, "youcancomein");
    const postId = req.body.item_id;

    try{
        const authorized = await isAuthorized(postId, validToken.id);
        
        if(authorized.canSee === false){
            res.json(authorized)
        }
        else{
            console.log(authorized)
            recipe = getRecipe(postId);
            res.json({
                canSee: true,
                recipe: recipe
            })
        }
    }
    catch (error) {
        res.json({ error: "There was an error getting the recipe!!" })
    }
})

module.exports = router