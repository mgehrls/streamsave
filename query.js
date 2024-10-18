const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('streamsave');
        const collection = database.collection('listItem');

        // Perform your query here
        const results = await collection.find({}).toArray();
        console.log(results);
    } finally {
        await client.close();
    }
}

run().catch(console.error);
