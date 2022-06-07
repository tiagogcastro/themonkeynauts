type GetPercentageInt = {
  percentage: number;
  value: number;
};

<<<<<<< HEAD
function getPercentageInt({ percentage, value }: getPercentageInt) {
  return Math.floor((percentage / 100) * value);
=======
function getPercentageInt({ percentage, value }: GetPercentageInt) {
  return Math.floor((percentage / 100) * value + value);
>>>>>>> e9fe2edbe477ab21b656ed1440f1b22b7100320b
}

export { getPercentageInt };
