const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: {
        type: String,
        trim: true,
        default: "String is required"
    },
    date: {
        type: Date,
        default: Date.now() - 1
    }
});

const Comment = mongoose.model("User", CommentSchema);

module.exports = Comment;