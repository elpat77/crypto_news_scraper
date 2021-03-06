const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connection = mongoose.connection;
const logger = require("morgan");
const colors = require("colors");
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/crypto_news_db"

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", () => {
    console.log("connected to database".magenta);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./views"));

app.use(logger("dev"));

const scrapRoutes = require("./controller/scrapRoutes");
app.use("/api", scrapRoutes);

const htmlRoutes = require("./controller/html-routes");
app.use("/", htmlRoutes);

app.listen(PORT, () => {
    console.log("-----------------------------------".rainbow);
    console.log(`listening at: http://localhost:${PORT}`.cyan);
    console.log("-----------------------------------".rainbow);
});


