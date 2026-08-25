interface IRateLimiterProvider {
  consume(ip: string, overwriteDuration?: number): Promise<void>;
}

export { IRateLimiterProvider };
