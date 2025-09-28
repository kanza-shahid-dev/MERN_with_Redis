import express from "express";
import User from "../model/user.js";
import redisClient from "../utils/redisClient.js";

const router = express.Router();
const cacheKey = "allUsers";

router.post("/create", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email)
      return res.json({
        message: "name , email required",
      });
    const user = await User.create({ name, email });
    //remove cache
    await redisClient.del(cacheKey);
    return res.status(201).json({
      message: "user created",
      user: user,
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
});

router.get("/list", async (req, res) => {
  console.log("list");
  try {
    //check cache
    const cachedUsers = await redisClient.get(cacheKey);
    if (cachedUsers) {
      console.log("cache hit");
      return res.json({ users: JSON.parse(cachedUsers) });
    }
    //cache miss
    const users = await User.find();
    if (users.length) {
      await redisClient.set(cacheKey, JSON.stringify(users), "EX", 3600);
      console.log("cache miss");
      return res.status(201).json(users);
    }
  } catch (error) {
    return res.send({ error: error.message });
  }
});

export default router;
