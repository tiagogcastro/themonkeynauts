import { IRateLimiterProvider } from '@shared/domain/providers/rate-limiter-provider';
import { AppError } from '@shared/errors/app-error';
import { RateLimiterMemory } from 'rate-limiter-flexible';

class RateLimiterProvider implements IRateLimiterProvider {
  private limiter: RateLimiterMemory;

  private readonly DURATION: number = 3600;

  constructor() {
    const limiter = new RateLimiterMemory({
      points: 1,
      duration: this.DURATION,
    });

    this.limiter = limiter;
  }

  async consume(ip: string, overwriteDuration = this.DURATION): Promise<void> {
    this.limiter.duration = overwriteDuration;

    const hourOrHours = this.limiter.duration / this.DURATION;
    try {
      await this.limiter.consume(ip);
    } catch {
      throw new AppError(
        `You need to wait ${hourOrHours} ${
          hourOrHours === 1 ? 'hour' : 'hours'
        }`,
        429,
      );
    }
  }
}

export { RateLimiterProvider };
