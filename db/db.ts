import {MongoClient} from "mongodb"

const url = Deno.env.get('MONGO_URL');
if(!url) {
    throw new Error("You need a mongo url");
}

const client = new MongoClient(url);
await client.connect();