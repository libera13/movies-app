const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================

router.post("/favoriteNumber", (req, res) => {
  // find favorite by movie id
  Favorite.find({ movieId: req.body.movieId }).exec((err, favorite) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, favoriteNumber: favorite.length });
  });
});

router.post("/favorited", (req, res) => {
  // find favorite Information by movie id, userfrom
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, favorited) => {
    if (err) return res.status(400).send(err);

    // check if this movie is already favorited
    let result = false;
    if(favorited.length !== 0) {
        result = true
    }
    res.status(200).json({ success: true, favorited: result });
  });
});

module.exports = router;
