const express = require("express");
const router = express.Router();
const Sermon = require("../models/sermon")



// get route

router.get("/sermon", async (req, res) => {
    const sermon = await Sermon.findOne({}).sort({ date: -1 }).limit(1)

    try {
        res.render("sermon/sermon", { sermon: sermon })
    } catch (e) {
        console.log(e)
        return res.render("index")
    }
})

module.exports = router;
