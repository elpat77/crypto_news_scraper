const axios = require("axios");
const cheerio = require("cheerio");

axios.get("https://news.search.yahoo.com/search?p=crypto&fr=uh3_news_vert_gs&fr2=p%3Anews%2Cm%3Asb&guce_referrer=aHR0cHM6Ly9uZXdzLnlhaG9vLmNvbS8&guce_referrer_sig=AQAAAAysTPtKKwDYhzYST_QSS6enyNs7byjIL0i9XT7pohXO8hILlV55JdvywEv3nkmNWpWLoCwHbCSWnXGIXi2ot9jinqP6fGJtghZnfGiQaVc8Pn7GdT6plgZbhTNV8edX4b6txEmHeroDXp3zhf4-a1nXjIbmWC5NkIy1Xb9skV9L&_guc_consent_skip=1580864801").then(urlResponse => {
    let $ = cheerio.load(urlResponse.data);
    // console.log(urlResponse.data);

    // const data = $("header.post-preview-item-card__header");
    // console.log(data);
    $("ul.compArticleList").each((i, element) => {
        var resultsYahoo = [];
        var yahooTitle = $(element)
            .find("a.thmb")
            .attr("title");
        var yahooLink = $(element)
            .find("a.thmb")
            .attr("href");
        var obj1 = {
            title: yahooTitle,
            link: yahooLink
        }
        resultsYahoo.push(obj1);
        console.log(resultsYahoo);
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
    });
})