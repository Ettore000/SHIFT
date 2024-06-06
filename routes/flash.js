const express = require('express');
const flashRouter = express.Router();

flashRouter.use((req, res, next) => {

    // recover flash from the session
    let flash = req.session.flash;

    // if it does not exist it is initialized
    if (flash === undefined) {
        flash = {
            errors: [],
            warnings: [],
            success: []
        };
    }
    // res.locals is cleared for each request/response
    res.locals.flash = flash;

    // session flash is cleaned to avoid repeated messages
    delete req.session.flash;

    next();
});

module.exports = flashRouter;