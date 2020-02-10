const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/all', (req, res) => {
    db.Scrap.find().then(scrap => {
        res.json(scrap);
    });
});

router.get('/findByTitle', (req, res) => {
    db.Scrap.find({
        title: req.body.title
    }).then(result => {
        res.json(result);
    });
});

router.get('/scrape', (req, res) => {
    axios.get("https://www.forbes.com/crypto-blockchain/#4257484d2b6e").then(response => {
        let $ = cheerio.load(response.data);
        // console.log(response.data);
        var resultsForbes = [];
        $("div.section-pick").each((i, element) => {
            var title = $(element)
                .find("a.section-pick__title")
                .attr("title");
            var link = $(element)
                .find("a.section-pick__title")
                .attr("href");
            const url = $(element)
                .find('a').attr('href').split();
            // var obj2 = {
            //     title: forbesTitle,
            //     link: forbesLink
            // };
            // resultsForbes.push(obj2);
            console.log(title);
            console.log(link);

            db.Scrap.find({
                title: title
            }).then(result => {
                if (result.length > 0) {
                } else {
                    let newObj = {}
                    newObj.title = title.toString();
                    newObj.link = link.toString();
                    fullUrl = "https://www.forbes.com/" + url.toString();
                    newObj.url = fullUrl;
                    console.log(newObj);

                    db.Scrap.create(newObj).then(result => {
                    }).catch((err) => res.json(err));
                }
            });
        });
        res.send("success");
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

// router.post('/comment/:id', (req, res) => {
//     db.News.findByIdAndUpdate(
//         { _id: req.params.id },
//         {
//             $push: {
//                 comments: {
//                     firstName: req.body.firstName,
//                     lastName: req.body.lastName,
//                     comment: req.body.comment
//                 }
//             }
//         }).then(result => {
//             res.json(result);
//         }).catch((err) => {
//             res.send(err);
//         });
// });

module.exports = router;