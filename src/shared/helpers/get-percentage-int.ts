type getPercentageInt = {
  percentage: number;
  value: number;
};

function getPercentageInt({ percentage, value }: getPercentageInt) {
  return Math.floor((percentage / 100) * value + value);
}

export { getPercentageInt };
