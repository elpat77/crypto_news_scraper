const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', (req, res) => {
    db.crypto_news_db.find().then(news => {
        res.json(news);
    });
});

router.get('/findByTitle', (req, res) => {
    db.News.find({
        headline: req.body.headline
    }).then(result => {
        res.json(result);
    });
});


axios.get("https://www.forbes.com/crypto-blockchain/#4257484d2b6e").then(response => {
    let $ = cheerio.load(response.data);
    // console.log(response.data);

    $("div.section-pick").each((i, element) => {
        var resultsForbes = [];
        var forbesTitle = $(element)
            .find("a.section-pick__title")
            .attr("title");
        var forbesLink = $(element)
            .find("a.section-pick__title")
            .attr("href");
        var obj2 = {
            title: forbesTitle,
            link: forbesLink
        };
        resultsForbes.push(obj2);
        // console.log(artTitle);
        // console.log(artLink);
        console.log(resultsForbes);
        resultsForbes.forEach(article => {
            $("#articleTitle").append(
                `
                        <p>${resultsForbes}<p>
                        <p>${forbesLink}</p>

                `
            );
        });
    })
})