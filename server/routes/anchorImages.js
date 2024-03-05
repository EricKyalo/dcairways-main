const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary/index") // no need to add index.js bcoz node automatically looks for index.js
const uploads = multer({ storage })
const AnchorImages = require("../models/anchorImages")



router.post("/anchorImages", uploads.array('images', 3), async (req, res) => {
    let anchorImages = new AnchorImages({
        images: req.files.map(f => ({ url: f.path, filename: f.filename }))
    })
    // const img = anchorImages.images;
    try {

        anchorImages = await anchorImages.save()
        // console.log(anchorImages.images)
        res.redirect("/")
        req.flash('success', 'Successfully uploaded new anchor images!')

    } catch (e) {
        console.log(e);
        res.render("new/new")
        // returns us to the new page incase there's an error
    }
})

module.exports = router;