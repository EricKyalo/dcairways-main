const express = require("express");
const router = express.Router();
const Sermon = require("../models/sermon")


// get route

router.get("/showpage", async (req, res) => {

    try {
        let perPage = 10;
        let page = req.query.page || 1;
        let sermon = await Sermon.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();


        // Count is deprecated - please use countDocuments
        // const count = await Sermon.count();
        const count = await Sermon.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        res.render("sermon/show", {
            sermon: sermon,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/showpage'
        })
    } catch (e) {
        console.log(e)
        return res.render("index")
    }
})

module.exports = router;


