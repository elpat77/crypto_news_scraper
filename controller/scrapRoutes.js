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
        title: req.body.title,
        link: req.body.link,
        comment: req.body.comment
    }).then(newScrap => {
        res.send(newScrap);
    });
});

router.post('/comment/:id', (req, res) => {
    db.Scrap.findIDAndComment(
        { _id: req.params.id },
        {
            $push: {
                comments: {
                    userName: req.body.userName,
                    userEmail: req.body.userEmail,
                    userComment: req.body.userComment
                }
            }
        }).then(result => {
            res.json(result);
        }).catch((err) => {
            res.send(err);
        });
});

module.exports = router;