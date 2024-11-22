import 'dotenv/config';
import { ObjectId } from 'mongodb';
import connectDB from '../config/db.js';

const conn = await connectDB(process.env.MONGODB_URL);

export async function getAllPosts() {
    const db = conn.db("imersao-instabytes");
    const collection = db.collection("posts");
    return collection.find().toArray();
}

export async function createPost(newPost) {
    const db = conn.db("imersao-instabytes");
    const collection = db.collection("posts");
    return collection.insertOne(newPost);
}

export async function updatePostInDB(postID, post) {
    const db = conn.db("imersao-instabytes");
    const collection = db.collection("posts");
    const objID = ObjectId.createFromHexString(postID);
    return collection.updateOne({ _id: new ObjectId(objID) }, { $set: post });
}