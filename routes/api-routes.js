const express = require("express");
const router = express.Router();
const db = require("../models");


router.get("/all", (req, res) => {
    db.Scrap.find().then(scrap => {
        res.send(scrap);
    })
});

router.post("/new", (req, res) => {
    db.Scrap.create({
        title: req.body.title,
        webLink: req.body.webLink,
        comments: req.body.comments
    }).then(newScrap => {
        res.send(newScrap);
    });
});


module.exports = router;
