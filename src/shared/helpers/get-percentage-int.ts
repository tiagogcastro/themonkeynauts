type GetPercentageInt = {
  percentage: number;
  value: number;
};

function getPercentageInt({ percentage, value }: GetPercentageInt) {
  return Math.floor((percentage / 100) * value);
}

export { getPercentageInt };
