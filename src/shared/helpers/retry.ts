import { debounce } from './debounce';

let attempts = 0;

const retry = async (
  callback: () => Promise<boolean>,
  delay?: number,
  maxAttempts = 2000,
) => {
  const _retry = await callback();

  if (maxAttempts !== 0) {
    attempts += 1;
  }

  if (attempts === maxAttempts && maxAttempts !== 0) {
    return;
  }

  if (_retry) {
    debounce(() => retry(callback), delay || 0);
  }
};

export { retry };
