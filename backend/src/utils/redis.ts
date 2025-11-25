import { Redis } from "ioredis";
import { ENV } from "../config/ENV";
const Redis_URL = ENV.REDIS_URL || "";

const redisClient = () => {
  if (Redis_URL) {
    console.log(`Redis connected`);
    return Redis_URL;
  }

  throw new Error(`Redis not connected`);
};

export const redis = new Redis(redisClient());
