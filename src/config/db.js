import { MongoClient } from "mongodb";

export default async function connectDB(mongoURL) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(mongoURL);
        console.log("Conecting to database cluster...");
        await mongoClient.connect();
        console.log("Connected successfully to database cluster!");

        return mongoClient;
    } catch (err) {
        console.error("Error connecting to database cluster", err);
        process.exit(1);
    }
}