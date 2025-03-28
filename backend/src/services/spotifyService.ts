import RedisService from './redisService';

class SpotifyService {
  /**
   * Save Spotify state to Redis.
   * @param state - The state string to save.
   * @param ttl - Time-to-live in seconds (default: 300 seconds).
   */
  static async saveState(state: string, ttl: number = 300): Promise<void> {
    await RedisService.save(state, 'valid', ttl);
  }

  /**
   * Verify Spotify state from Redis.
   * @param state - The state string to verify.
   * @returns True if the state is valid, false otherwise.
   */
  static async verifyState(state: string): Promise<boolean> {
    const isValid = await RedisService.get(state);
    if (isValid) {
      await RedisService.delete(state); // Remove the state after verification
      return true;
    }
    return false;
  }
}

export default SpotifyService;