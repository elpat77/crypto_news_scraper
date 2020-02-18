const express = require('express');
const router = express.Router();
const db = require('../models');


router.post("/new", (req, res) => {
    db.Comment.create({
        text: req.body.text
    }).then(newScrap => {
        res.send(newScrap);
    });
});

// router.post('/comment/:id', (req, res) => {
//     db.Scrap.findIDAndComment(
//         { _id: req.params.id },
//         {
//             $push: {
//                 comment: {
//                     userComment: req.body.userComment
//                 }
//             }
//         }).then(result => {
//             res.json(result);
//         }).catch((err) => {
//             res.send(err);
//         });
// });

module.exports = router;