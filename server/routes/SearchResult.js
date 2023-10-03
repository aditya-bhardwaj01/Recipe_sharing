const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "recipe_sharing"
});

const fetchSearchResult = (req) => {
    const {
        searchtype,
        searchvalue,
        mnCost,
        mxCost,
        mnRating,
        mxRating,
        mnTime,
        mxTime,
        mnCalorie,
        mxCalorie,
        difficulty,
        season
    } = req.body;

    // Create a new variable to hold the updated searchtype
    let updatedSearchtype = searchtype;

    if (searchtype === 'recipename') updatedSearchtype = 'title';
    else if (searchtype === 'recipetype') updatedSearchtype = 'category';

    const conditions = [
        `${updatedSearchtype} = ?`,
        'payment >= ?',
        'payment <= ?',
        'rating >= ?',
        'rating <= ?',
        'total_time >= ?',
        'total_time <= ?',
        'calories >= ?',
        'calories <= ?',
        'difficulty IN (?)',
        'best_season IN (?)'
    ];

    const params = [
        searchvalue,
        mnCost - 0.001,
        mxCost + 0.001,
        mnRating - 0.001,
        mxRating + 0.001,
        mnTime - 0.001,
        mxTime + 0.001,
        mnCalorie - 0.001,
        mxCalorie + 0.001
    ];

    if (difficulty.length > 0) {
        params.push(difficulty);
    } else {
        params.push('xyz');
    }

    if (season.length > 0) {
        params.push(season);
    } else {
        params.push('xyz');
    }

    const whereClause = conditions.join(' AND ');

    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM posts WHERE ${whereClause}`, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                //   console.log(result);
                resolve(result);
            }
        });
    });
};



router.post("/", async (req, res) => {
    try {
        const result = await fetchSearchResult(req);
        res.json({ item: result });
    }
    catch (error) {
        res.json({ error: "There was some error fetching the result!!" })
    }

    // res.json({success: "success"});
})

module.exports = router