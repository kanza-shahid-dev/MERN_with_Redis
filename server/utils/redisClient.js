import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config(); 

const client = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT), 
  },
});

client.on("error", (err) => console.error("Redis Client Error", err));

client.connect().then(() => console.log("connected to redis"));

export default client;
