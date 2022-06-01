let timeout: NodeJS.Timeout | null = null;

const debounce = (callback: () => Promise<void>, delay: number) => {
  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(callback, delay);
};

export { debounce };
