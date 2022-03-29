import { MongoClient } from "./deps.ts";
import { URI } from "./config.ts";
const client = new MongoClient();
try {
  await client.connect(
    URI,
  );
} catch (err) {
  console.log(err);
}
const db = client.database();

export { db };
