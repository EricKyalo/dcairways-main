const express = require("express");
const router = express.Router();
const Sermon = require("../models/sermon");
const AnchorImages = require("../models/anchorImages");

// get route
router.get("/", async (req, res) => {
   try {
      const sermon = await Sermon.findOne({}).sort({ createdAt: -1 }).limit(1);
      const anchorImages = await AnchorImages.find({}).sort({ createdAt: -1 }).limit(1);
      res.render("index", { sermon: sermon, anchorImages: anchorImages })
   } catch (e) {
      console.log(e)
      return res.render("index")
   }
})

module.exports = router;




// router.get('', async (req, res) => {
//   const locals = {
//     title: "NodeJs Blog",
//     description: "Simple Blog created with NodeJs, Express & MongoDb."
//   }

//   try {
//     const data = await Post.find();
//     res.render('index', { locals, data });
//   } catch (error) {
//     console.log(error);
//   }

// });


