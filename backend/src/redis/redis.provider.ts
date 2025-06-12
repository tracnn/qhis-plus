import Redis from 'ioredis';

export const redisClient = new Redis({
  host: process.env.REDIS_SERVER_URL || 'localhost',
  port: +(process.env.REDIS_SERVER_PORT || 6379),
  password: process.env.REDIS_SERVER_PASSWORD || '',
});