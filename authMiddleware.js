const session = require('express-session')

const requireLogin = (req, res, next) => {
    if (!req.session.validUser_id) {
        console.log(req.session.validUser_id)
        return res.redirect('/login')
    }
    next();
}

module.exports = { requireLogin };