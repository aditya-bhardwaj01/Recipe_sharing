const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "recipe_sharing"
});

const fetchSearchResult = (searchtype, searchvalue) => {
    if(searchtype === 'recipename') searchtype = 'title';
    else if(searchtype == 'recipetype') searchtype = 'category';
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM posts WHERE ${searchtype} = ?`, [searchvalue], (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

router.post("/", async (req, res) => {
    const searchtype = req.body.searchtype;
    const searchvalue = req.body.searchvalue;

    try{
        const result = await fetchSearchResult(searchtype, searchvalue);
        res.json({item: result});
    }
    catch(error){
        res.json({error: "There was some error fetching the result!!"})
    }

    // res.json({success: "success"});
})

module.exports = router