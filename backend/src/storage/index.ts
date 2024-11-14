import { MongoDBClient } from "../db";

export let mongoClient = new MongoDBClient();
let db = mongoClient.getDb();

const userCollection = db.collection("users");
const questionsCollection = db.collection("questions");
const questionStatusCollection = db.collection("question-status");

export {
    userCollection,
    questionsCollection,
    questionStatusCollection,
};
