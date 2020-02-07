const express = require("express");
const router = express.Router();
const db = require("../models");


router.get("/all", (req, res) => {
    db.Scrap.find().then(scrap => {
        res.send(scrap);
    })
});


module.exports = router;
