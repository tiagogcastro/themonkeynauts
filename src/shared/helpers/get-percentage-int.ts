type getPercentageInt = {
  percentage: number;
  value: number;
}

function getPercentageInt({
  percentage, 
  value
}: getPercentageInt) {
  const percentageCalc = (percentage / 100) * value;

  const final = value + percentageCalc;

  return final;
}

export {
  getPercentageInt
}