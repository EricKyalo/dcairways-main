const express = require("express")
const router = express.Router()
const User = require("../models/user")


// GET /admin login route
router.get("/logout", (req, res) => {

    req.session.user = null
    res.redirect("/")
});
module.exports = router;
// router.get('/logout', (req, res) => {
//     req.logout();
//     req.flash('success', "Goodbye!");
//     res.redirect('/');
// })