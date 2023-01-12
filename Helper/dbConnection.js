const { MongoClient } = require('mongodb')
async function dbConnect() {
    try {
        const client = new MongoClient("mongodb://localhost:27017")
        await client.connect()
        console.log('Connected successfully to server');
        return client.db("digixito_DB")
    } catch (error) {
        console.log("==== DB Connection Error ====", error.message);
        throw error;
    }
};


module.exports = { dbConnect }
