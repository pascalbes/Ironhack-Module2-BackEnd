const express = require("express");
const router = express.Router();
const tagModel = require("../models/Tag");
const sneakerModel = require("../models/Sneaker");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", (req, res) => {
  Promise.all([tagModel.find(), sneakerModel.find()])
  .then(dbRes => {
    res.render("products", {tags:dbRes[0], sneakers:dbRes[1], script: ["tag-selector"]});
  })
  .catch(err => console.log("error while load sneakers", err))
});

router.get("/sneakers/:cat", (req, res) => {
  Promise.all([tagModel.find(), sneakerModel.find({category: req.params.cat})])
  .then(dbRes => {
    res.render("products", {tags: dbRes[0], sneakers:dbRes[1], script: ["tag-selector"], category:req.params.cat});
  })
  .catch(err => console.log("error while load sneaker cat", err));
});

router.get("/one-product/:id", (req, res) => {
  sneakerModel
  .findById(req.params.id)
  .then(sneaker => {
    res.render("one_product", {sneaker});
  })
  .catch(err => console.log("error while load one sneaker", err))
});

router.post("/tag-selection", (req, res) => {

  console.log(req.body)

  var tagChecked = req.body.tagChecked
  var category = req.body.category
  
  console.log(tagChecked);
  console.log(category);

  if (tagChecked.length===0 && category.length===0){
    sneakerModel
    .find()
    .then(sneakers => {
      res.send(sneakers)
    })
  } else if (tagChecked.length===0) {
    sneakerModel
    .find({category: category })
    .then(sneakers => {
      res.send(sneakers)
    })
    .catch(err=> console.log("error", err));
  } else if (category.length===0) {
    sneakerModel
    .find({id_tags: {$in: tagChecked}})
    .then(sneakers => {
      res.send(sneakers)
    })
    .catch(err=> console.log("error", err));
  } else {
    sneakerModel
    .find({id_tags: {$in: tagChecked}, category: category })
    .then(sneakers => {
      res.send(sneakers)
    })
    .catch(err=> console.log("error", err));
  }

  
});

module.exports = router;
