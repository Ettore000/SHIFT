module.exports = {
    mongoClient: null,
    app: null,
    init: function (app, mongoClient) {
        this.mongoClient = mongoClient;
        this.app = app;
    },
    getAllBicycles: async function (filter, options) {
        try {
            const client = await this.mongoClient.connect(this.app.get('connectionStrings'));
            const database = client.db("Shift");
            const collectionName = 'bicycles';
            const bicyclesCollection = database.collection(collectionName);
            return await bicyclesCollection.find(filter, options).toArray();
        } catch (error) {
            throw error;
        }
    }
};