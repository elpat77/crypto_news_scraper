const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScrapSchema = new Schema({
    title: {
        type: String,
        required: "Title is required"
    },
    link: {
        type: String,
        required: "WebLink is required"
    },
    comment: {
        type: [Schema.Types.String],
        default: []
    }
});

const Scrap = mongoose.model("Scrap", ScrapSchema);

module.exports = Scrap;