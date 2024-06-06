const express = require('express');
const userSession = express.Router();

userSession.use(function(req, res, next) {
    if ( req.session.user ) {
        // user is authenticated, allows the request to continue
        next();
    } else {
        // user is not authenticated, redirects to login page
        res.redirect("/users/login");
    }
});

module.exports = userSession;