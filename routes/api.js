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

/*router.get('/paymentSuccess', (req, res) => {
    res.render('paymentSuccess.twig');
});*/

router.get('/paymentError', (req, res) => {
    res.render('paymentError.twig');
});

router.get('/pay', (req, res) => {
    res.render('pay.twig');
});

router.post('/pay', function (req, res) {
    processPayment().then(() => {
        res.redirect('/bookings/paymentSuccess');
    }).catch(error => {
        res.status(500).send('Payment failed, please try again.');
    });
});

function processPayment() {
    return new Promise((resolve, reject) => {
        // Simulate a delay in payment
        setTimeout(() => {
            resolve(); // Simulate successful payment
        }, 2000);
    });
}

module.exports = router;
