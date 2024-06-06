const express = require('express');
const router = express.Router();

/* GET welcome page. */
router.get('/', function(req, res, next) {
    res.render('index.twig');
});

module.exports = router;
