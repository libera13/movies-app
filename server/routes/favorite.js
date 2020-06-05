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
    return res.status(200).json({ success: true, favoriteNumber: favorite.length });
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
    if (favorited.length !== 0) {
      result = true;
    }
    return res.status(200).json({ success: true, favorited: result });
  });
});

router.post("/addToFavorite", auth, (req, res) => {
  // save the information about the movie or user Id inside favorite collection
  const favorite = new Favorite(req.body);

  favorite.save((err, doc) => {
    if (err) return res.status(400).send({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/removeFromFavorite", auth, (req, res) => {
  // delete favorite

  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/getFavoredMovie", (req, res) => {
  Favorite.find({ 'userFrom': req.body.userFrom })
      .exec((err, favorites) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, favorites })
      })
});

module.exports = router;
