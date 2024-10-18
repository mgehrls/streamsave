const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; // Your MongoDB connection string
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('yourDatabase'); // Replace with your database name
        const collection = database.collection('yourCollection'); // Replace with your collection name

        // Perform your query here
        const results = await collection.find({}).toArray();
        console.log(results);
    } finally {
        await client.close();
    }
}

run().catch(console.error);
