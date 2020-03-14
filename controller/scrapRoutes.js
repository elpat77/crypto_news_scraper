const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/all', (req, res) => {
    db.Scrap.find().then(scrap => {
        res.send(scrap);
    });
});

router.get('/find/:id', (req, res) => {
    db.Scrap.findById({
        _id: req.params.id
    }).then(result => {
        res.send(result);
    });
});


router.get('/scrape', (req, res) => {
    axios.get("https://www.forbes.com/crypto-blockchain/#4257484d2b6e").then(response => {
        let $ = cheerio.load(response.data);
        $("div.section-pick").each((i, element) => {
            var title = $(element)
                .find("a.section-pick__title")
                .attr("title");
            var link = $(element)
                .find("a.section-pick__title")
                .attr("href");
            // console.log(title);
            // console.log(link);

            db.Scrap.find({
                title: title
            }).then(result => {
                if (result.length > 0) {
                } else {
                    let newObj = {}
                    newObj.title = title.toString();
                    newObj.link = link.toString();
                    console.log(newObj);

                    db.Scrap.create(newObj).then(result => {
                    }).catch((err) => res.send(err));
                }
            });
        });
        res.send("data has been pushed to the database");
    });
});

router.post("/new", (req, res) => {
    db.Scrap.create({
        text: req.body.text
    }).then(newComment => {
        res.send(newComment);
    });
});

router.post('/comment/:id', (req, res) => {
    console.log("params.id", req.params.id)
    console.log("req.body", req.body.comment)

    db.Scrap.findByIdAndUpdate(
        { _id: req.params.id },

        { "$push": { "comments": req.body.comment } }, { "new": true, "upsert": true }
    ).then(result => {
        console.log(result)
        res.json(result);
    }).catch((err) => {
        console.log(err)
        res.send(err);
    });
});

module.exports = router;