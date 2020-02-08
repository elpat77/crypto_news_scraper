const axios = require("axios");
const cheerio = require("cheerio");


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
    });
})