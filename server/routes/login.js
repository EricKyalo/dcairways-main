const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")


// GET /admin login route
router.get("/login", (req, res) => {
  if (!req.session.validUser_id) {
    res.render("admin/login", { session: req.flash("session"), failure: req.flash("failure") })
  } else {
    res.redirect("/newSermon")
  }
});


// POST /signin
router.post("/login", async (req, res) => {
  try {
    // find a user in Mongo with provided username
    // if !user username send msg
    const [validUser] = await User.find({ username: req.body.username })
    if (!validUser) {
      req.flash("failure", "User Does Not Exist")
      res.render("admin/login", { failure: req.flash("failure") })
    } else {

      // if user with username exists check if passwords match
      // if match success redirect 
      const match = await bcrypt.compare(req.body.password, validUser.password)
      if (match) {
        req.session.validUser_id = validUser._id
        // console.log(req.session.validUser_id)
        res.redirect("/newSermon");
      } else {
        req.flash("failure", "Wrong Password")
        res.render("admin/login", { failure: req.flash("failure") })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("Ooops Sorry Error Occured! Try Again Please.")
  }
})

module.exports = router
