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

            res.render("calendar.twig", {date, availableBicycles : availableBicycles});
        } catch (error) {
            res.status(500).send("Error fetching available bicycles.");
        }
    })

    app.post('/bookings/reserve', async function (req, res){
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
    });


};