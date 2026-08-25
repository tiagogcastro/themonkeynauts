const getRandomNumber = (min: number, max: number) => {
  const random = Math.random() * (max - min + 1) + min;

  if (random > max) {
    return Number(max.toFixed(2));
  }

  return Number(random.toFixed(2));
};

export { getRandomNumber };
