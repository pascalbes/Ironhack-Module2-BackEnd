const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require("../models/Sneaker");
const tagModel = require("../models/Tag");
const checkloginStatus = require("./../middlewares/checkloginStatus");

router.get("/", checkloginStatus, (req, res) => {
    sneakerModel
        .find()
        .then(sneakers => {
            console.log(sneakers);
            res.render("products_manage", {
                sneakers
            });
        })
        .catch(dbErr => console.log("error loading sneakers on dashboard", dbErr));
});

router.get("/edit/:id", checkloginStatus, (req, res) => {
    Promise.all([tagModel.find(),sneakerModel.findById(req.params.id)])
        .then(dbRes => {
            
            var allTags = dbRes[0];
            const sneakerTags = dbRes[1].id_tags;
            // // console.log(sneakerTags)
            const newArray = allTags.map((val, i)=> {
                console.log({...val})
                return {...val.toObject(), isTrue: false}
            })
            console.log(newArray)
            
            // allTags.forEach((el, i) => {
            //     console.log(i, allTags[i], typeof allTags[i])
            //     allTags[i]["isTrue"]="false"
            //     sneakerTags.forEach((el2) => {
            //         console.log(el._id, el2)
            //         if (el._id == el2) {
            //             console.log("ok")
            //             allTags[i]["isTrue"]="true"
            //         }
            //     })
            // });

            // console.log(allTags)

            res.render("product_edit", {
                sneaker: dbRes[1],
                tags: dbRes[0],
            });
        })
        .catch(dbErr => console.log("error loading sneaker edit on dashboard", dbErr));
})

router.post("/edit/:id", checkloginStatus, (req, res, next) => {
    const {
        image,
        name,
        ref,
        sizes,
        description,
        price,
        id_tags
    } = req.body;

    var sizesArr = sizes.split(",");
    sizesArr = sizesArr.map(size => Number(size));

    var category = [];
    if (req.body.kids === 'on') {
        category.push("kids");
    }

    if (req.body.men === 'on') {
        category.push("men");
    }

    if (req.body.women === 'on') {
        category.push("women");
    }

    sneakerModel
        .findByIdAndUpdate(req.params.id, {
            image,
            name,
            ref,
            sizesArr,
            description,
            price,
            category,
            id_tags
        })
        .then(() => {
            req.flash("success", "sneaker successfully added");
            res.redirect("/dashboard")
        })
        .catch(next);
});

router.get("/delete/:id", checkloginStatus,(req, res) => {
    sneakerModel
        .findByIdAndDelete(req.params.id)
        .then(dbRes => {
            console.log("delete ok", dbRes);
            res.redirect("/dashboard");
        })
        .catch(dbErr => console.log("error deleting sneaker", dbErr));
});

router.get("/add",checkloginStatus, (req, res) => {
    tagModel
    .find()
    .then(tags => {
        res.render("products_add", {tags});
    })
    .catch(dbErr => console.log("error loading add sneaker", dbErr));
});

router.post("/add",checkloginStatus, (req, res,next) => {
    const {
        image,
        name,
        ref,
        sizes,
        description,
        price,
        id_tags
    } = req.body;

    var sizesArr = sizes.split(",");
    sizesArr = sizesArr.map(size => Number(size));

    var category = [];
    if (req.body.kids === 'on') {
        category.push("kids");
    }

    if (req.body.men === 'on') {
        category.push("men");
    }

    if (req.body.women === 'on') {
        category.push("women");
    }

    sneakerModel
        .create({
            image,
            name,
            ref,
            sizesArr,
            description,
            price,
            category,
            id_tags
        })
        .then(() => {
            req.flash("success", "sneaker successfully updated");
            res.redirect("/dashboard")
        })
        .catch(next);
});

router.post("/add-tag",checkloginStatus, (req, res,next) => {


    console.log("reqbody", req.body)
    const {name} = req.body;

    tagModel
        .create({name})
        .then(() => {
            req.flash("success", "tag successfully created");
            res.redirect("/dashboard")
        })
        .catch(next);

});

module.exports = router;