const express = require("express");
const router = express.Router();
const User = require("../models/user")
const bcrypt = require("bcrypt");


// GET Registration Page 
router.get("/register", (req, res) => {
  res.render("admin/register", { success: req.flash("success"), failure: req.flash("failure") })
});


// POST /register user
router.post("/register", async (req, res) => {
  // hashing password using bcrypt
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const name = req.body.username

  let newUser = {
    username: name,
    password: hashedPassword
  }
  console.log(newUser)

  // find a user in Mongo with provided username
  const [registered] = await User.find({ username: name })
  try {
    // if there is no user with that username
    // save the user and redirect to login
    if (!registered) {
      newUser = new User(newUser)
      await newUser.save()
      req.flash("success", "User Registration Successful. Go to Login")
      res.render("admin/register", { success: req.flash("success"), failure: req.flash("failure") })
    } else {
      req.flash("failure", "Username already exists choose another one")
      res.render("admin/register", { success: req.flash("success"), failure: req.flash("failure") })
    }
    // In case of any error, give status code and send error
  } catch (error) {
    console.log(error)
    res.status(500).send("Ooops Sorry Error Occured!!")
  }
})
module.exports = router

