import { debounce } from './debounce';

let attempts = 0;

const retry = async (
  callback: () => Promise<boolean>,
  delay?: number,
  max_attempts = 2000,
) => {
  const _retry = await callback();

  if (max_attempts !== 0) {
    attempts += 1;
  }

  if (attempts === max_attempts && max_attempts !== 0) {
    return;
  }

  if (_retry) {
    debounce(() => retry(callback), delay || 0);
  }
};

export { retry };
