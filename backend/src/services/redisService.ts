import redis from '../config/redis';

class RedisService {
  /**
   * Save a key-value pair to Redis with an optional expiration time.
   * @param key - The key to save.
   * @param value - The value to save.
   * @param ttl - Time-to-live in seconds (optional).
   */
  static async save(key: string, value: string, ttl?: number): Promise<void> {
    try {
      if (ttl) {
        await redis.set(key, value, 'EX', ttl); // Save with expiration
      } else {
        await redis.set(key, value); // Save without expiration
      }
      console.log(`Saved to Redis: ${key}`);
    } catch (err) {
      console.error(`Error saving to Redis (key: ${key}):`, err);
      throw err;
    }
  }

  /**
   * Retrieve a value from Redis by key.
   * @param key - The key to retrieve.
   * @returns The value associated with the key, or null if not found.
   */
  static async get(key: string): Promise<string | null> {
    try {
      const value = await redis.get(key);
      console.log(`Retrieved from Redis: ${key}`);
      return value;
    } catch (err) {
      console.error(`Error retrieving from Redis (key: ${key}):`, err);
      throw err;
    }
  }

  /**
   * Delete a key from Redis.
   * @param key - The key to delete.
   */
  static async delete(key: string): Promise<void> {
    try {
      await redis.del(key);
      console.log(`Deleted from Redis: ${key}`);
    } catch (err) {
      console.error(`Error deleting from Redis (key: ${key}):`, err);
      throw err;
    }
  }
}

export default RedisService;