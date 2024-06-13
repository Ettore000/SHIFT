module.exports = function (app, bookingsRepository, bicyclesRepository) {

    app.get('/bookings/calendar', async function (req, res) {
        try {
            let date = req.query.date;
            if (date) {
                const [year, month, day] = date.split('-');
                date = `${day}/${month}/${year}`;
            }

            const bookingsByDate = await bookingsRepository.getBookingsByDate(date);
            const bookedBikeIds = bookingsByDate.map(booking => String(booking.bike_id));
            const allBicycles = await bicyclesRepository.getAllBicycles();
            // get all bikes that are not booked
            const availableBicycles = allBicycles.filter(bicycle => !bookedBikeIds.includes(String(bicycle._id)));

            res.render('calendar.twig', { date, availableBicycles });
        } catch (error) {
            res.status(500).send("Error fetching available bicycles.");
        }
    })

    /*app.post('/bookings/calendar', async function (req, res){
        try {
            const { bikeId, date } = req.body;

            const booking = {
                user_id: req.session.user,
                bike_id: bikeId,
                date: date
            };
            await bookingsRepository.insertBooking(booking);

            res.redirect("/api/pay");
        } catch (error) {
            res.status(500).send('Error processing reservation');
        }
    });*/

    app.post('/bookings/reserve', function (req, res) {
        try {
            const { bikeId, date } = req.body;
            // Store the reservation in the session temporarily
            req.session.tempBooking = { user_id: req.session.user, bike_id: bikeId, date: date };

            res.redirect("/api/pay");
        } catch (error) {
            res.status(500).send('Error processing reservation');
        }
    })

    app.get('/bookings/paymentSuccess', async function (req, res) {
        try {
            const booking = req.session.tempBooking;
            if (booking) {
                // Insert the reservation into the database after successful payment
                await bookingsRepository.insertBooking(booking);

                // Clear the temporary reservation of the session
                delete req.session.tempBooking;
            }
            res.render("paymentSuccess.twig");
        } catch (error) {
            res.status(500).send('Error processing reservation');
        }
    })

};