//QUESTIONS
// Can we scrap every page?  
// More efficient way to handle page refresh?

var express = require("express");
var mongoose = require("mongoose");
var axios = require('axios');
var cheerio = require("cheerio");
var fs = require("fs");
var writeStream = fs.createWriteStream('post.csv');

writeStream.write(`Title,date,link,image \n`);

var db = require("./models");
var PORT = 3000;
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/propertyarticle", { useNewUrlParser: true });

app.get("/scrape", function (req, res) {
    console.log("scrape begin");

    for (i = 1; i < 2; i++) {
        axios.get("https://www.domain.com.au/news/nsw/page/" + i).then(function (response) {

            var $ = cheerio.load(response.data);

            $("div.tile-domain-news").each(function (i, element) {

                var result = {};

                result.title = $(this)
                    .children(".tile-domain-news__info")
                    .children("a")
                    .children("h3")
                    .text();

                result.publish_date = $(this)
                    .children(".tile-domain-news__info")
                    .children(".tile-domain-news__subtitle")
                    .children("span")
                    .first()
                    .text();

                result.web_link = $(this)
                    .children(".tile-domain-news__info")
                    .children("a")
                    .attr("href");

                result.image_link = $(this)
                    .children(".tile-domain-news__media-link")
                    .children(".tile-domain-news__media")
                    .attr("src");

                // console.log(result);
                writeStream.write(`${result.title},${result.publish_date},${result.web_link},${result.image_link} \n`);

                db.Article.create(result)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
            })
            res.send("Scrape Complete");
        })
    }
})

app.get("/articles", function (req, res) {
    // Finish the route so it grabs all of the articles

    var data = {};

    db.Article.find({ save_article: false })
        .then(function (result) {
            data.push(result)
            db.Note.find({ save_article: false })
                .then(function (result) {
                })
        })


});

app.get("/article-saved", function (req, res) {
    // Finish the route so it grabs all of the articles
    db.Article.find({ save_article: true })
        .then(function (data) {
            res.json(data)
        })

});



app.post("/save/article", function (req, res) {


    db.Article.update({ _id: req.body.id }, { save_article: true }, function (err, res) {
    }).then(function (data) {
        res.json("it works");
    });

});

app.post("/save/note", function (req, res) {
    db.Note.create(req.body)
        .then(function (note) {
            res.json("it works");
        })
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
