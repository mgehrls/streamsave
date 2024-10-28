/* eslint-disable @typescript-eslint/no-var-requires */
const { MongoClient } = require('mongodb') ;

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
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
