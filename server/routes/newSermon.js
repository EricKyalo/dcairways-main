const express = require("express");
const router = express.Router();
const Sermon = require("../models/sermon");
const multer = require("multer");
const { storage } = require("../cloudinary/index"); // no need to add index.js bcoz node automatically looks for index.js
const uploads = multer({ storage });
const { requireLogin } = require("../../authMiddleware");


// get route for new form/page
router.get("/newSermon", requireLogin, (req, res) => {
    res.render("new/new")
});


// post route
router.post("/newSermon", uploads.single("image"), async (req, res) => {
    let sermon = new Sermon({
        title: req.body.title,
        series: req.body.series,
        image: {
            url: req.file.path,
            filename: req.file.filename
        },
        reading: req.body.reading,
        date: req.body.date,
        preacher: req.body.preacher,
        sermon: req.body.sermon
    })
    console.log(sermon)
    try {
        sermon = await sermon.save()
        req.flash('success', 'Successfully made a new sermon!')
        res.redirect("/")
        console.log(req.body)
    } catch (e) {
        console.log(e);
        res.render("new/new", { sermon: sermon })
        // returns us to the new page incase there's an error
    }
});

// using sermon.slug instead of sermon.id

module.exports = router;
