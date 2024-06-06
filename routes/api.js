const express = require('express');
const router = express.Router();

router.get('/map', (req, res) => {
    res.render('map.twig');
});

router.get('/bicycles', (req, res) => {
    res.render('bicycles.twig');
});

router.get('/cookies', (req, res) => {
    res.render('cookies.twig');
});

router.get('/contact', (req, res) => {
    res.render('contact.twig');
});

router.get('/paymentSuccess', (req, res) => {
    res.render('paymentSuccess.twig');
});

router.get('/paymentError', (req, res) => {
    res.render('paymentError.twig');
});

router.get('/pay', (req, res) => {
    res.render('pay.twig');
});

module.exports = router;
