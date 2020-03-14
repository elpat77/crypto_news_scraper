const express = require('express');
const router = express.Router();
const db = require('../models');


router.post("/new", (req, res) => {
    db.Comment.create({
        text: req.body.text
    }).then(newScrap => {
        res.send(newScrap);
    });
});

router.post('/comment/:id', (req, res) => {
    db.Scrap.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $push: { comments: req.body.comment }
        }).then(result => {
            console.log(result)
            res.json(result);
        }).catch((err) => {
            console.log(err)
            res.send(err);
        });
});

module.exports = router;