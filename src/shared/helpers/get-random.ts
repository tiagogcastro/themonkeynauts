const getRandomNumber = (min: number, max: number) => {
  const random = Math.random() * (max - min + 1) + min;

  return random;
};

export { getRandomNumber };
