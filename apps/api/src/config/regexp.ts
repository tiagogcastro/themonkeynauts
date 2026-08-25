const passwordRegExp =
  /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z]).{8,255}$/;

const txHashRegExp = /^0x([A-Fa-f0-9]{64})$/;

export { passwordRegExp, txHashRegExp };
