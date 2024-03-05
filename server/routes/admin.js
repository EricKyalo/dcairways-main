const express = require("express");
const router = express.Router();
const Sermon = require("../models/sermon");
const { requireLogin } = require("../../authMiddleware");

// GET route
router.get("/admin", requireLogin, async (req, res) => {
   const sermon = await Sermon.find({}).sort({ date: -1 }).limit(10)
   try {
      res.render("admin/showAdmin", { sermon })
   } catch (e) {
      console.log(e)
      return res.render("index")
   }
})

// EDIT/GET ROUTE
router.get("/admin/:id", requireLogin, async (req, res) => {
   let sermon = await Sermon.findByIdAndUpdate(req.params.id, req.body)

   res.render("admin/edit", { sermon })
})



// EDIT/PUT route
router.put("/admin/:id", requireLogin, async (req, res) => {
   let sermon = await Sermon.findByIdAndUpdate(req.params.id, req.body)
   try {

      sermon = await sermon.save()
      res.redirect("/admin")
   } catch (e) {
      console.log(e);
      res.render("new/new", { sermon: sermon })
      // returns us to the new page incase there's an error
   }
});

// DELETE route
router.delete("/admin/:id", requireLogin, async (req, res) => {
   await Sermon.findByIdAndDelete(req.params.id)
   res.redirect("/admin")
})


module.exports = router;
