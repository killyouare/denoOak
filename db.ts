import { MongoClient } from "./deps.ts";

const client = new MongoClient();
await client.connect(
  "mongodb+srv://course:course@cluster0.qpysx.mongodb.net/test?authMechanism=SCRAM-SHA-1",
);

const db = client.database();

export { db };
