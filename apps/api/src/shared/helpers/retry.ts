import { debounce } from './debounce';

let attempts = 0;

const retry = async (
  callback: () => Promise<boolean>,
  delay = 0,
  maxAttempts = 60,
) => {
  const RETRY = await callback();

  if (maxAttempts !== 0) {
    attempts += 1;
  }

  if (attempts === maxAttempts && maxAttempts !== 0) {
    return;
  }

  if (RETRY) {
    debounce(() => retry(callback), delay);
  }
};

export { retry };
