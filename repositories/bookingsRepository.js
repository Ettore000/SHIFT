module.exports = {
    mongoClient: null,
    app: null,
    init: function (app, mongoClient) {
        this.mongoClient = mongoClient;
        this.app = app;
    },
    insertBooking: async function (user) {
        try {
            const client = await this.mongoClient.connect(this.app.get('connectionStrings'));
            const database = client.db("Shift");
            const collectionName = 'bookings';
            const bookingsCollection = database.collection(collectionName);
            const result = await bookingsCollection.insertOne(user);
            return result.insertedId;
        } catch (error) {
            throw (error);
        }
    },
    getBookingsByDate: async function (date) {
        try {
            const client = await this.mongoClient.connect(this.app.get('connectionStrings'));
            const database = client.db("Shift");
            const collectionName = 'bookings';
            const bookingsCollection = database.collection(collectionName);
            return await bookingsCollection.find({ date: { $eq: date } }).toArray();
        } catch (error) {
            throw (error);
        }
    }
};