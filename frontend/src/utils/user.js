export const validatePasswordStrength = (pw) => {
  // min length 6, at least 1 numeric value, 1 uppercase, 1 lowercase
  let re = /(?=^.{6,}$)(?=.*\d)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  return re.test(pw);
};
